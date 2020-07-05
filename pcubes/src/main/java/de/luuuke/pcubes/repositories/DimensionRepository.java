package de.luuuke.pcubes.repositories;

import de.luuuke.pcubes.models.cube.structure.Dimension;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DimensionRepository extends CrudRepository<Dimension, Long> {

  List<Dimension> findByCubeStructureId(Long id);

}
