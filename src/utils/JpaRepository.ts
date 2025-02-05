

export interface JpaRepository<T, ID, CreateDto, UpdateDto> {
  save(createDto: CreateDto): Promise<T>;
  update(id:ID,updateDto:UpdateDto): Promise<T>;
  remove(id: ID): Promise<T | void>;
  findById(id: ID): Promise<T>;
  findAll(): Promise<T[]>;
}