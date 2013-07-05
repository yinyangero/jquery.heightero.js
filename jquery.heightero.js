/*
 *  Author:
 *  Jerome F. Agpaoa (yinyangero@gmail.com)
 *  
 *  Resizes the children of matched element height.
 *  This plugin is based on the requirement of Tramigo Cloud UI
 *  
 *  This plugin is licensed under Tramigo and requires the 
 *  consent of the author before when used in commercially.
 *
 *  Not applicable for the window and document objects.
 *
 */

(function($) {

    $.fn.heightero = function(options)
    {

        if (typeof options == 'string' ||
            options instanceof String)
        {
            // perform the action asked for
            return;
        }
        
        var defaults = $.extend(
        {
            containerHeight: null, // stores the height of parent
            itemCount: null, // detects the number of items in container
            heightMap: [], // the height for each container items
            fillExtra: null, // the element that fills the extra space
            items: null // the children elements that belong to container
        },
        options);

        var totalPercent = 100;

        function hasOverflow(elem)
        {
            var el = $(elem)[0];
            
            var curOverflow = el.style.overflow;
            var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
            el.style.overflow = curOverflow;

            return isOverflowing;
        }

        function isString(object)
        {
            return (typeof object == 'string' ||
                    object instanceof String);
        }

        function hasSubstring(haystack, needle, isCaseSensitive)
        {
            var searchFrom = haystack;
            var searchFor = needle;
            if (isCaseSensitive)
            {
                searchFrom = haystack;
                searchFor = needle
            }
            else
            {
                searchFrom = haystack.toLowerCase();
                searchFor = needle.toLowerCase();
            }
            return (searchFrom.indexOf(searchFor) >= 0);
        }

        function isNumeric(n) 
        {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function initOptions(thisObject)
        {
            if (defaults.items == null ||
                defaults.items.length == 0)
            {
                defaults.items = $(thisObject).children();
            }

            if (defaults.itemCount == null)
                defaults.itemCount = defaults.items.length;

            if (defaults.containerHeight == null)
                defaults.containerHeight = $(thisObject).height();

            if (defaults.heightMap == null || 
                defaults.heightMap.length == 0)
            {
                defaults.heightMap = [];
                for(var i = 0; i < defaults.itemCount; i++)
                    defaults.heightMap.push(totalPercent /
                        defaults.itemCount);
            }
        }

        function getRealHeightValue(height)
        {
            if (isString(height))
            {
                if (hasSubstring(height, 'px'))
                {
                    height = height.replace('px', '');
                    if (isNumeric(height)) return Math.floor(parseInt(height));
                }
                else if (height == '*' ||
                        height == 'auto')
                    return height;
            }
            else
            {
                if (isNumeric(height))
                    return Math.floor(defaults.containerHeight * 
                        height / totalPercent);
            }

            return null;
        }

        function resolveRealHeightForExtraFill(thisObject)
        {
            var extraFillIndex = -1;
            var alreadyOccupied = 0;
            for(var i = 0; i < defaults.itemCount; i++)
            {
                var height = defaults.realHeight[i];
                var item = defaults.items[i];
                if (isNumeric(height))
                {
                    if (isNumeric(height)) alreadyOccupied += height;
                }
                else if (height == 'auto')
                {
                    var itemHeight = $(item).outerHeight(true);
                    alreadyOccupied += Math.floor(itemHeight);
                }
                else if (height == '*')
                    extraFillIndex = i;
            }
            if (extraFillIndex != -1)
            {
                var val = defaults.containerHeight - alreadyOccupied;
                if (val < 0) val = 0;
                defaults.realHeight[extraFillIndex] = Math.floor(val);
            }
        }

        function getRealHeight(thisObject)
        {
            defaults.realHeight = [];
            for(var i = 0; i < defaults.itemCount; i++)
            {
                defaults.realHeight[i] = 
                    getRealHeightValue(defaults.heightMap[i]);
            }

            return defaults.realHeight;
        }

        function setHeight(thisObject)
        {
            // set height of children
            for(var i in defaults.heightMap)
            {
                var height = defaults.realHeight[i];
                var child = defaults.items[i];
                var map = defaults.heightMap[i];
                if (map == 'auto')
                {
                    $(child).css('display', 'block');
                    $(child).css('height', "auto");
                    continue;
                }

                $(child).css('display', 'block');
                $(child).css('overflow-y', 'auto');
                $(child).height(height);
                var outerHeight = $(child).outerHeight(true);
                height -= (outerHeight - height);
                $(child).height(height);
            }
        }

        function resolveExtraSpace(thisObject)
        {
            if (defaults.fillExtra != null)
            {
                for(var i = 0; i < defaults.itemCount; i++)
                {
                    var item = defaults.items[i];
                    if (!hasOverflow($(item)))
                    {
                        $(item).css('height', 'auto');
                    }
                }

                $(defaults.fillExtra).css('height', 'auto');
            }
        }

        function setCSS(thisObject)
        {
            for(var i = 0; i < defaults.itemCount; i++)
            {
                var item = defaults.items[i];
                $(item).css('overflow-y', 'auto');
            }
        }

        return this.each(function()
        {
            var thisObject = this;
            initOptions(thisObject);
            getRealHeight(thisObject);
            resolveRealHeightForExtraFill(thisObject);
            setHeight(thisObject);
            resolveExtraSpace(thisObject);
            setCSS(thisObject);
        });
    };

})(jQuery);
