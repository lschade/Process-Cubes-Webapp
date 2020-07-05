package de.luuuke.pcubes.repositories;

import de.luuuke.pcubes.models.cube.structure.DimensionAttribute;
import org.springframework.data.repository.CrudRepository;

public interface DimensionAttributeRepository extends CrudRepository<DimensionAttribute, Long> {

  Iterable<DimensionAttribute> findAllByOrderByCreatedAtAsc();

}