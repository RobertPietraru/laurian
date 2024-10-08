
class AppUser {
    id: string
    email: string
    name: string

    constructor({ id, email, name }: { id: string; email: string; name: string }) {
        this.id = id
        this.email = email
        this.name = name
    }

}
