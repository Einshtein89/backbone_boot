package com.nixsolutions.backbone_boot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nixsolutions.backbone_boot.dao.BookRepository;
import com.nixsolutions.backbone_boot.entity.Book;

@Service("bookService")
public class BookServiceImpl implements BookService
{
  @Autowired
  private BookRepository bookRepository;

  @Override
  public Book findDistinctByPrice(double price)
  {
    return bookRepository.findDistinctByPrice(price);
  }

  @Override
  public Book findByTitle(String title)
  {
    return bookRepository.findByTitle(title);
  }
}
