package de.luuuke.pcubes.repositories;

import de.luuuke.pcubes.model.ProcessCubeStructure;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProcessCubeStructureRepository extends MongoRepository<ProcessCubeStructure, String> {

}
