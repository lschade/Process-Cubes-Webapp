package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.models.Dimension;
import de.luuuke.pcubes.models.ProcessCubeStructure;
import de.luuuke.pcubes.repositories.DimensionRepository;
import de.luuuke.pcubes.repositories.ProcessCubeStructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/pcs/{pcsId}/dimensions")
public class DimensionController {

    private DimensionRepository dimensionRepository;

    private ProcessCubeStructureRepository pcsRepository;


    @Autowired
    public DimensionController(DimensionRepository repository, ProcessCubeStructureRepository pcsRepository) {
        this.dimensionRepository = repository;
        this.pcsRepository = pcsRepository;
    }

    @GetMapping("")
    public List<Dimension> getAll(@PathVariable Long pcsId) {
        return this.dimensionRepository.findByProcessCubeStructureId(pcsId);
    }

    @PostMapping("")
    public ResponseEntity<Dimension> post(@PathVariable Long pcsId, @RequestBody Dimension obj) {
        Optional<ProcessCubeStructure> maybePcs = this.pcsRepository.findById(pcsId);
        if(!maybePcs.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Dimension dimension = new Dimension(obj.getName(), maybePcs.get());
        return ResponseEntity.ok(dimensionRepository.save(dimension));
    }
}
