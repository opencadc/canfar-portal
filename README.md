---
---

### CANFAR.net


Website code for [CANFAR.net](http://www.canfar.net).

The layout is all [Jekyll](http://jekyllrb.com) with [Markdown](https://daringfireball.net/projects/markdown/basics).

#### Configuration

{% capture translations_yml %}[translations.yml]({{ site.github.repository_url }}/tree/gh-pages/_data/translations.yml){% endcapture %}

The configuration is handled by YAML files located in the [_data]({{ site.github.repository_url }}/tree/gh-pages/_data) directory.

##### {{ translations_yml }}

##### [menudata.yml]({{ site.github.repository_url }}/tree/gh-pages/_data/menudata.yml) 

This is menu layout for the dropdown menus and related left-menu (side nav).
The format is:
`<menuname>: [<items>]`

Where `<menuname>` is the related name in {{ translations_yml }}.

###### [showcases.yml]({{ site.github.repository_url }}/tree/gh-pages/_data/showcases.yml)
