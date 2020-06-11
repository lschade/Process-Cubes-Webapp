package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.models.Dimension;
import de.luuuke.pcubes.models.ProcessCubeStructure;
import de.luuuke.pcubes.repositories.DimensionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/pcs")
public class ProcessCubeStructureController extends BasicController<ProcessCubeStructure> {

  private DimensionRepository dimensionRepository;

  @Autowired
  public ProcessCubeStructureController(CrudRepository<ProcessCubeStructure, Long> repository, DimensionRepository dimensionRepository) {
    super(repository);
    this.dimensionRepository = dimensionRepository;
  }

  @GetMapping("/{pcsId}/dimensions")
  public ResponseEntity<List<Dimension>> getDimensions(@PathVariable Long pcsId) {
    List<Dimension> byProcessCubeStructureId = this.dimensionRepository.findByProcessCubeStructureId(pcsId);
    return ResponseEntity.ok(byProcessCubeStructureId);
  }

  @PostMapping("/{pcsId}/dimensions")
  public ResponseEntity<Dimension> addDimension(@PathVariable Long pcsId, @RequestBody Dimension dim) {
    Optional<ProcessCubeStructure> maybePcs = this.getRepository().findById(pcsId);
    if (!maybePcs.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    Dimension dimension = new Dimension(dim.getName(), maybePcs.get());
    return ResponseEntity.ok(dimensionRepository.save(dimension));
  }

}
