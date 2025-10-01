# -*- coding: utf-8 -*-
"""Supabase Storage Migration - Local Ubuntu Version"""

import re
import os
import magic
import shutil
import zipfile
from pathlib import Path
from supabase import create_client

print("✓ Imports are set!")

# --- Step 1: Setup Supabase credentials ---
NEW_PROJECT_URL = "https://ewuxzsjidumzwembfgyj.supabase.co" # @param {type:"string"}
NEW_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3dXh6c2ppZHVtendlbWJmZ3lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE4NDM1NCwiZXhwIjoyMDc0NzYwMzU0fQ.mWEH8a_Sq1EK4qmEouQziCLRmqHUwIEu5Of-W-5ECOM" # @param {type:"string"}

print("✓ New Project Credentials are set!")
# --- Step 2: Define helper functions ---

def upload_local_files_to_bucket(client, bucket_name: str, local_bucket_path: str, skip_existing: bool = False) -> None:
    """Upload files from a local directory to a Supabase storage bucket."""
    local_bucket_path = Path(local_bucket_path)

    if not local_bucket_path.exists():
        raise FileNotFoundError(f"Local bucket path does not exist: {local_bucket_path}")

    total_files = sum(1 for _ in local_bucket_path.rglob('*') if _.is_file())
    processed_files = 0

    for file_path in local_bucket_path.rglob('*'):
        if not file_path.is_file():
            continue

        try:
            relative_path = str(file_path.relative_to(local_bucket_path))
            remote_path = relative_path.replace(os.sep, '/')

            processed_files += 1
            print(f"\rProgress: {processed_files}/{total_files} files", end="")

            if skip_existing:
                try:
                    client.storage.from_(bucket_name).download(remote_path)
                    print(f"\nSkipping existing file: {remote_path}")
                    continue
                except Exception:
                    pass

            mime_type = magic.from_file(str(file_path), mime=True)

            with open(file_path, 'rb') as file_object:
                client.storage.from_(bucket_name).upload(
                    remote_path,
                    file_object,
                    file_options={"content-type": mime_type, "x-upsert": "true"}
                )
        except Exception as e:
            print(f"\nError uploading {file_path}: {str(e)}")

    print(f"\nCompleted uploading files to bucket '{bucket_name}'")

def extract_zip_to_temp(zip_path: str) -> Path:
    """Extract a ZIP file containing bucket folders to a temporary directory."""
    zip_path = Path(zip_path)
    if not zip_path.exists():
        raise FileNotFoundError(f"ZIP file not found: {zip_path}")

    temp_dir = Path("/tmp/supabase_storage_temp")
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir()

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(temp_dir)

    print(f"\nFiles extracted to {temp_dir}")

    # Assume the first folder in the ZIP is the root
    root_candidates = [d for d in temp_dir.iterdir() if d.is_dir()]
    if not root_candidates:
        raise FileNotFoundError("No folder found in the extracted ZIP")
    
    root_dir = root_candidates[0]
    print(f"Root directory set to: {root_dir}")
    return root_dir

# --- Step 3: Initialize Supabase client ---
try:
    new_supabase_client = create_client(NEW_PROJECT_URL, NEW_SERVICE_KEY)
except Exception as e:
    raise Exception(f"Failed to initialize Supabase client: {str(e)}")

# --- Step 4: Provide path to your ZIP file locally ---
zip_file_path = input("Enter the full path to your storage ZIP file: ").strip()
local_root_path = extract_zip_to_temp(zip_file_path)

# --- Step 5: List existing buckets ---
try:
    buckets = new_supabase_client.storage.list_buckets()
except Exception as e:
    raise Exception(f"Failed to list buckets: {str(e)}")

print("\nFound the following buckets:")
for bucket in buckets:
    print(f"- {bucket.name}")

# --- Step 6: Upload files ---
for bucket in buckets:
    bucket_name = bucket.name
    local_bucket_path = local_root_path / bucket_name
    print(f"\nLocal path: '{local_bucket_path}'")

    if not local_bucket_path.exists():
        print(f"Local path for bucket '{bucket_name}' does not exist. Skipping.")
        continue

    print(f"\nProcessing bucket '{bucket_name}'...")

    # Create bucket if it doesn't exist
    try:
        new_supabase_client.storage.create_bucket(
            bucket_name,
            options={"public": bucket.public}
        )
        print(f"Bucket '{bucket_name}' created successfully.")
    except Exception as e:
        if "already exists" not in str(e).lower():
            print(f"Error creating bucket '{bucket_name}': {str(e)}")
            continue

    # Upload files
    upload_local_files_to_bucket(
        new_supabase_client,
        bucket_name,
        str(local_bucket_path),
        skip_existing=True
    )