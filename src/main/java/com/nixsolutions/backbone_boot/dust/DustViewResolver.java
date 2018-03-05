package com.nixsolutions.backbone_boot.dust;

import org.springframework.web.servlet.view.AbstractTemplateViewResolver;

public class DustViewResolver extends AbstractTemplateViewResolver {
	public DustViewResolver() {
		setViewClass(requiredViewClass());
	}
	
	@Override
	protected Class requiredViewClass() { 
		return DustView.class;
	}
}
