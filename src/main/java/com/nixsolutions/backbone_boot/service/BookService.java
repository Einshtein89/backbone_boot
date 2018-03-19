package com.nixsolutions.backbone_boot.service;

import com.nixsolutions.backbone_boot.entity.Book;

public interface BookService
{
  Book findDistinctByPrice(double price);
  Book findByTitle(String title);
}
