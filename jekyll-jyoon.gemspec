# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-jyoon"
  spec.version       = "0.1.0"
  spec.authors       = ["jaeyo_on"]
  spec.email         = ["jyo3on@gmail.com"]

  spec.summary       = %q{Jekyll Theme created by JaeYoon Song}
  spec.homepage      = "http://blog.jaeyoon.io"
  spec.license       = "MIT"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 3.6"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end