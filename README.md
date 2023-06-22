# Part One:

```javascript
{% assign topLevelLinks = linklist.links %}

<nav class="main-nav">
  <ul class="nav-list">
    {% for link in topLevelLinks %}
      <li class="nav-item relative">
        <a href="{{ link.url }}" class="nav-link">{{ link.title }}</a>
        {% if link.links %}
          <ul class="sub-nav absolute hidden bg-white p-2 shadow-md">
            {% for subLink in link.links %}
              <li class="sub-nav-item">
                <span class="sub-nav-title font-bold underline">{{ subLink.title }}</span>
                {% if subLink.links %}
                  <ul class="sub-sub-nav">
                    {% assign sortedLinks = subLink.links | sort: 'title' %}
                    {% for subSubLink in sortedLinks %}
                      <li class="sub-sub-nav-item">
                        <a href="{{ subSubLink.url }}" class="sub-sub-nav-link{% if forloop.last %} italic{% endif %}">{{ subSubLink.title }}</a>
                      </li>
                    {% endfor %}
                  </ul>
                {% endif %}
              </li>
            {% endfor %}
            <li class="sub-sub-nav-item">
              <a href="{{ link.url }}" class="sub-sub-nav-link italic">Shop All</a>
            </li>
          </ul>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
</nav>

<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script>
  $(document).ready(function() {
    $('.nav-item').hover(
      function() {
        $(this).find('.sub-nav').removeClass('hidden');
      },
      function() {
        $(this).find('.sub-nav').addClass('hidden');
      }
    );
  });
</script>
```
