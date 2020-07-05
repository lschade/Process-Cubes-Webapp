package de.luuuke.pcubes.repositories;

import de.luuuke.pcubes.models.AttributeValueNumber;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface AttributeValueNumberRepository extends CrudRepository<AttributeValueNumber, Long> {

  Set<AttributeValueNumber> findAllByLowerAndUpper(double lower, double upper);

}
