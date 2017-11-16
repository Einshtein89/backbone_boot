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
			repository.save(new User("Jack", "Bauer", "(123)-456-7890", "man"));
			repository.save(new User("Chloe", "O'Brian", "(123)-456-7890", "woman"));
			repository.save(new User("Kim", "Bauer", "(123)-456-7890", "man"));
			repository.save(new User("David", "Palmer", "(123)-456-7890", "man"));
			repository.save(new User("Michelle", "Dessler", "(123)-456-7890", "woman"));
			repository.save(new User("Joe", "Ken", "(123)-456-7890", "woman"));
			repository.save(new User("Arnold", "Ivanov", "(123)-456-7890", "man"));
			repository.save(new User("Luck", "Petrov", "(123)-456-7890", "man"));
			repository.save(new User("Kelly", "Sun", "(123)-456-7890", "woman"));
			repository.save(new User("Adolf", "Musterman", "(123)-456-7890", "man"));
			repository.save(new User("Kelvin", "Clein", "(123)-456-7890", "man"));
			repository.save(new User("Travis", "Anglin", "(123)-456-7890", "man"));
			repository.save(new User("Jack", "Smirnov", "(123)-456-7890", "man"));
			repository.save(new User("Pit", "Stop", "(123)-456-7890", "man"));
			repository.save(new User("Miranda", "Walsh", "(123)-456-7890", "woman"));
			repository.save(new User("Celeste", "O", "(123)-456-7890", "woman"));
			repository.save(new User("Johnny", "Depp", "(123)-456-7890", "man"));

		};
	}
}
