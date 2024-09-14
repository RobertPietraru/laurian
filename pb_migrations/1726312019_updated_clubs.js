/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ai3ktx2iq437qs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yfrbrdgm",
    "name": "memberCount",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ai3ktx2iq437qs")

  // remove
  collection.schema.removeField("yfrbrdgm")

  return dao.saveCollection(collection)
})
