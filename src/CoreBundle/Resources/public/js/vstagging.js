/**
 * Created by Viktor Schröder on 21.03.2015.
 */

+function ($) {
    'use strict';
    var addTag = function(tag, tagsInput, insertMark, input) {
        console.log("input:");
        console.log(input);
        tag = $.trim(tag);

        var tagList = tagsInput.val().split(",");
        for(var i = 0; i < tagList.length; i++) {
            if(tagList[i] == tag) {
                return false;
            }
        }

        var remove = $("<button type='button' class='delete'><span>&times;</span></button>");
        var item = $("<li class='tag'><span>"+tag+"</span></li>");

        item.append(remove);
        remove.on("click", {item: item, tag: tag, tagsInput: tagsInput, input: input}, function(event) {
            var item = event.data.item;
            var tag = event.data.tag;
            var tagsInput = event.data.tagsInput;
            var input = event.data.input;

            var tagList = tagsInput.val().split(",");
            tagsInput.val("");
            for(var i = 0; i < tagList.length; i++) {
                if(tagList[i] != tag) {
                    tagsInput.val((tagsInput.val().length > 0) ? (tagsInput.val() + "," + tagList[i]) : tagList[i]);
                }
            }
            if(tagList.length == 0) {
                input.attr("required", true);
            } else {
                input.attr("required", false);
            }
            item.remove();
            event.preventDefault();
        });
        tagsInput.val((tagsInput.val().length > 0) ? (tagsInput.val() + "," + tag) : tag);
        $(item).insertBefore(insertMark);
        if(tagList.length == 0) {
            input.attr("required", true);
        } else {
            input.attr("required", false);
        }
        return true;
    };
    $(window).on('load', function () {
        $("input.vs-tagging").each(function() {
            var $this = $(this);
            $this.css("display", "none");

            var container = $("<div class='vs-tagging'/>").insertAfter($this);
            var list = $("<ul />");
            var input = $("<input type='text' placeholder='Tag hinzufügen' />");
            var insertMark = $("<li />").append(input);
            list.append(insertMark);
            container.append(list);

            var tagList = $this.val().split(",");
            $this.val("");
            for(var i = 0; i < tagList.length; i++) {
                addTag(tagList[i], $this, insertMark, input);
            }

            input.on("keyup", {insertMark: insertMark, tagsInput: $this}, function(event) {
                var tagsInput = event.data.tagsInput;
                var insertMark = event.data.insertMark;

                var value = $(this).val();

                if(value.indexOf(",") > -1) {
                    var splt = value.split(",");
                    $(this).val("");
                    if(splt.length === 0) return;

                    var tag = splt[0];
                    if(tag.length === 0) return;

                    addTag(tag, tagsInput, insertMark, $(this));
                }
            });
            input.on("keypress", {insertMark: insertMark, tagsInput: $this}, function(event) {
                if(event.keyCode === 13) {
                    var tagsInput = event.data.tagsInput;
                    var insertMark = event.data.insertMark;

                    var value = $(this).val();
                    var tag = value;
                    if(value.indexOf(",") > -1) {
                        var splt = value.split(",");
                        if(splt.length !== 0) {
                            tag = splt[0];
                        }
                    }
                    $(this).val("");
                    if(tag.length > 0) {
                        console.log("$(this): ");
                        console.log($(this));
                        addTag(tag, tagsInput, insertMark, $(this));
                    }
                    event.preventDefault();
                }
            });
        });
    });
}(jQuery);