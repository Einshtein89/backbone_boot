package com.nixsolutions.backbone_boot.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nixsolutions.backbone_boot.entity.Book;
import com.nixsolutions.backbone_boot.entity.User;

public interface BookRepository extends JpaRepository<Book, Long>
{
  Book findDistinctByPrice(double price);
  Book findByTitle(String title);
}
