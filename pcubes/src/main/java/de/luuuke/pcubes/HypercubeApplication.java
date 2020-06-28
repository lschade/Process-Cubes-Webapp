package de.luuuke.pcubes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class HypercubeApplication {

  public static void main(String[] args) {
    SpringApplication.run(HypercubeApplication.class, args);
  }

}
