package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.models.Dimension;
import de.luuuke.pcubes.models.DimensionAttribute;
import de.luuuke.pcubes.repositories.DimensionAttributeRepository;
import de.luuuke.pcubes.repositories.DimensionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("/dimensions")
public class DimensionController extends BasicController<Dimension> {

  private DimensionAttributeRepository dimensionAttributeRepository;

  @Autowired
  public DimensionController(DimensionRepository repository,
                             DimensionAttributeRepository dimensionAttributeRepository) {
    super(repository);
    this.dimensionAttributeRepository = dimensionAttributeRepository;
  }

  @PostMapping("/{dimId}/attributes")
  public ResponseEntity<DimensionAttribute> addAttribute(@PathVariable Long dimId, @RequestBody DimensionAttribute attribute) {
    Optional<Dimension> dimension = this.getRepository().findById(dimId);
    if (!dimension.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    DimensionAttribute dimensionAttribute = new DimensionAttribute(
        attribute.getName(),
        attribute.getDtype(),
        dimension.get());

    DimensionAttribute saved = dimensionAttributeRepository.save(dimensionAttribute);

    return ResponseEntity.ok(saved);
  }

}
