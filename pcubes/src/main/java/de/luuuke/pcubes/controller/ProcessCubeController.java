package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.model.Dimension;
import de.luuuke.pcubes.model.ProcessCubeStructure;
import de.luuuke.pcubes.repositories.ProcessCubeStructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("dimensions")
public class ProcessCubeController {

  private ProcessCubeStructureRepository pcsRepository;

  @Autowired
  public ProcessCubeController(ProcessCubeStructureRepository pcsRepository) {
    this.pcsRepository = pcsRepository;
  }

  @PostMapping("")
  public ResponseEntity<ProcessCubeStructure> addDimension(@RequestParam String cube, @RequestParam String name) {
    Optional<ProcessCubeStructure> maybePCS = this.pcsRepository.findById(cube);

    if (maybePCS.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    ProcessCubeStructure processCubeStructure = maybePCS.get();
    Dimension dimension = new Dimension(name);
    processCubeStructure.getDimensions().add(dimension);
    ProcessCubeStructure save = this.pcsRepository.save(processCubeStructure);

    return ResponseEntity.ok(save);
  }

//  @PostMapping("{dimension}/attributes")
//  public ResponseEntity<ProcessCubeStructure> addAttribute(
//      @PathVariable String dimension,
//      @RequestParam String name,
//      @RequestParam String dtype) {
//    Optional<ProcessCubeStructure> maybePCS = this.pcsRepository.findById(cube);
//
//    if (maybePCS.isEmpty()) {
//      return ResponseEntity.notFound().build();
//    }
//
//
//  }
}
