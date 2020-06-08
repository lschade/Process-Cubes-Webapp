package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.models.ProcessCubeStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pcs")
public class ProcessCubeStructureController extends BasicController<ProcessCubeStructure> {

    @Autowired
    public ProcessCubeStructureController(CrudRepository<ProcessCubeStructure, Long> repository) {
        super(repository);
    }


}
