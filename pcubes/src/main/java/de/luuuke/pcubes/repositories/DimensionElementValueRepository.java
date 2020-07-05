package de.luuuke.pcubes.repositories;

import de.luuuke.pcubes.models.cube.structure.DimensionAttribute;
import de.luuuke.pcubes.models.cube.structure.DimensionElementValue;
import org.springframework.data.repository.CrudRepository;

public interface DimensionElementValueRepository extends CrudRepository<DimensionElementValue, Long> {

  Iterable<DimensionElementValue> findAllByDimensionAttribute(DimensionAttribute dimensionAttribute);
}
