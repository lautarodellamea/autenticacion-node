export class CreateCategoryDto {
  // constructor privado es una caracteristica de TS, para evitar que alguien intente crear una instancia de esta clase.
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  // este metodo me permitira llamar a mi constructor, ya que es privado y no lo puedo llamar desde fuera de este archivo
  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {

    const { name, available = false } = object;
    let availableBoolean = available;

    if (!name) return ["Missing name", undefined];

    if (typeof available !== "boolean") {
      availableBoolean = available === "true";
    }

    return [undefined, new CreateCategoryDto(name, availableBoolean)];
  }

}
