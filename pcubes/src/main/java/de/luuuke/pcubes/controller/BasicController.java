package de.luuuke.pcubes.controller;

import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public abstract  class BasicController<T>  {

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

    @PostMapping("")
    public ResponseEntity<T> post(@RequestBody T obj) {
        T saved = this.repository.save(obj);
        return ResponseEntity.ok(saved);
    }

}
