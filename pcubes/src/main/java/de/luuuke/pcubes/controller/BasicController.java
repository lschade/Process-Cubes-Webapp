package de.luuuke.pcubes.controller;

import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public abstract class BasicController<T> {

  private CrudRepository<T, Long> repository;

  public BasicController(CrudRepository<T, Long> repository) {
    this.repository = repository;
  }

  @GetMapping("")
  public ResponseEntity<Iterable<T>> getAll() {
    return ResponseEntity.ok(repository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<T> get(@PathVariable Long id) {
    return ResponseEntity.of(repository.findById(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<T> delete(@PathVariable Long id) {
    repository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @PostMapping("")
  public ResponseEntity<T> post(@RequestBody T obj) {
    T saved = this.repository.save(obj);
    return ResponseEntity.ok(saved);
  }

  public CrudRepository<T, Long> getRepository() {
    return repository;
  }
}
