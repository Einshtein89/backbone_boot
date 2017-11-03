package com.nixsolutions.backbone_boot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.nixsolutions.backbone_boot.dao.UserRepository;
import com.nixsolutions.backbone_boot.entity.User;

@SpringBootApplication
public class BackboneBootApplication {

	private static final Logger log = LoggerFactory.getLogger(BackboneBootApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BackboneBootApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(UserRepository repository) {
		return (args) -> {
			// save a couple of Users
			repository.save(new User("Jack", "Bauer", "23412342", "man"));
			repository.save(new User("Chloe", "O'Brian", "", "woman"));
			repository.save(new User("Kim", "Bauer", "", "man"));
			repository.save(new User("David", "Palmer", "234234", "man"));
			repository.save(new User("Michelle", "Dessler", "", "woman"));

		};
	}
}
