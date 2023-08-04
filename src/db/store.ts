type EntityType<T> = { key: keyof T; value: T[keyof T] };

abstract class DBStore<Entity extends { _id: string }, CreateDTO> {
  protected entities: Entity[] = [];

  abstract create(createDTO: CreateDTO): Entity;

  findAll = () => this.entities;

  findOne = ({ key, value }: EntityType<Entity>) => {
    return this.entities.find((user) => user[key] === value);
  };

  deleteById = (id: string) => {
    const idx = this.entities.findIndex((entity) => entity._id === id);
    if (idx < 0) return null;
    const deletedEntity = this.entities[idx];
    this.entities.splice(idx, 1);
    return deletedEntity;
  };
}

export default DBStore;
