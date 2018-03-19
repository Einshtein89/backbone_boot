package com.nixsolutions.backbone_boot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nixsolutions.backbone_boot.dao.BookRepository;
import com.nixsolutions.backbone_boot.entity.Book;
import com.nixsolutions.backbone_boot.entity.User;

@Controller
@RequestMapping("/books")
public class BookController
{
  @Autowired
  private BookRepository repository;

  @GetMapping("/{id}")
  public ResponseEntity<Book> getBookById(@PathVariable("id") Long id)
  {
    Book book = repository.findOne(id);
    return new ResponseEntity<Book>(book, HttpStatus.OK);
  }

  @GetMapping("")
  public ResponseEntity<List<Book>> getAllBooks()
  {
    List<Book> books = repository.findAll();
    return new ResponseEntity<List<Book>>(books, HttpStatus.OK);
  }
}
