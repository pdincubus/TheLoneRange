!function($) {
    var TheLoneRange = function(elem, opts) {
        this.init('thelonerange', elem, opts);
    };

    TheLoneRange.prototype = {
        constructor: TheLoneRange,
        init: function(type, elem, opts) {
            this.type = type;
            this.$element = $(elem);
            this.options = this.getOptions(opts);
            this.mode = 'range';

            this.setup();
        },

        setup: function() {
            var _this = this;
            // whether range slider or radio buttons
            //requires Modernizr to already be loaded
            if ( !Modernizr.inputtypes.range ) {
                this.calculateSteps();
                this.mode = 'radio';
                this.$element.find('input').on('change', function(e) { _this.$element.trigger(_this.type+'.change'); })
            } else {
                this.mode = 'range';
                this.$element.on('change', function() { _this.$element.trigger(_this.type+'.change'); })
            }
        },

        getOptions: function(opts) {
            return $.extend({}, $.fn[this.type].defaults, this.$element.data(), opts);
        },

        getScore: function() {
            if (this.mode === 'range') {
                return this.$element.find('input[type="range"]').val();
            } else if (this.mode === 'radio') {
                return this.$element.find('input:checked').val();
            }
        },

        calculateSteps: function() {
            var $range = this.$element.find('input[type="range"]'),
                minVal = $range.attr('min'),
                maxVal = $range.attr('max'),
                stepVal = $range.attr('step'),
                steps = [];

            for (var i = minVal; i <= maxVal; i++) {
                steps.push(i);
            }

            this.generateRadios(steps);
            $range.remove();
        },

        generateRadios: function(steps) {
            var that = this,
                $range = this.$element.find('input[type="range"]')
                groupName = $range.attr('id'),
                output = '';

            var labelText = 'Please select how much you agree with the statement, with the lowest value (' + steps[0] + ') meaning \'' + this.options.lowValueLabel + '\' and the highest value (' + steps[steps.length-1] + ') meaning \'' + this.options.highValueLabel + '\'';
            $range.siblings('label[for="' + $range.attr('id') + '"]').text(labelText);

            $.each( steps, function( index, value ){
                //make radios here?
                output += '<div>\n' +
                    '<input type="radio" name="' + groupName + '" id="' + groupName + index + '" value="' + value + '" class="visuallyhidden">\n' +
                    '<label for="' + groupName + index + '" class="' + that.options.labelClass + '">' + value + '</label>\n' +
                '</div>';
            });

            this.$element.append(output);
        }
    };

    $.fn.thelonerange = function(option) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (typeof option === 'string' && $.inArray(option, ['getScore']) !== -1) {
            var d = this.data('thelonerange');
            return d[option].apply(d, args);
        }

        return this.each(function() {
            var $this = $(this),
               data = $this.data('thelonerange'),
               options = typeof option == 'object' && option;

            if (!data) {
                $this.data('thelonerange', data = new TheLoneRange(this, options));
            }

            if (typeof option == 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.thelonerange.defaults = {
        lowValueLabel: 'Low',
        highValueLabel: 'High',
        labelClass: 'radioLabel'
    };
}(window.jQuery);
