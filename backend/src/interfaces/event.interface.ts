export interface EventInterface {
    id: number,
    title: string,
    description: string,
    price: number,
    endLocation?: string | null,
    links?: JSON | null,
    image: string,
    userId: number
}