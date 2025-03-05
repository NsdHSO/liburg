# NgxLiburgIcon
is a library for make more easy work with svg icon

It is a angular library

Code scaffolding
You have to added in your workspace https://fontawesome.com/download

I was inspired by this logic

https://plnkr.co/edit/eWi18QNOrzhrvVUbK1rH?p=preview&preview

Installation
### 1.npm i ngx-liburg-icon

### 2.Download icon

1. unzip the file,
2. open in sprites
3. copy the 3 files
4. paste in assets/icons
### 3.In AppModule you should import IconCoreModule

## After installed
In your project you should to have this structure src -> assets -> icons -> brands.svg/regular.svg/solid.svgs

Import module IconCoreModule in AppModule And you can use like that

```angular2html
<mat-icon
[svgIcon]="'fa_solid:person-through-window'"
class="your classes "
></mat-icon>
```
Enjoy this library :-)

Readme
Keywords
none
