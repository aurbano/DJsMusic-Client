define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        Song				= require('app/models/song'),
        App					= require('app/app'),

		collection = Backbone.Collection.extend({

			model: Song,
			
			initialize: function(models, options){
				this._meta = {};
			},
			
			url: function(){
				return App.url+"music";
			},
			
			meta: function(prop, value, notify, fetch) {
				if(typeof(prop) === 'undefined'){
					// Get all
					return this._meta;
				}else if(typeof(value) === 'undefined'){
					// Get one
		            return this._meta[prop];
		        }else{
		        	// Setter, triggers an event (duh)
		        	console.log('SongCollection: Set meta '+prop+'='+value);
		            this._meta[prop] = value;
		            
		            if(typeof(notify)==='undefined' || notify==true){
		            	this.trigger('set:meta');
		            }
		            if(typeof(fetch)==='undefined' || fetch==true){
		            	var this_ = this;
		            	this.reset();
		            	console.log('SongCollection: Fetch data: ', this_._meta);
		            	this.fetch({
		            		data: this_._meta,
		            		success: function(){
		            			this_.trigger('fetched');
		            		},
		            		xhr: function() {
								var xhr = $.ajaxSettings.xhr();
								xhr.onprogress = this_.handleProgress;
								return xhr;
							}
		            	});
		            }
		        }
		    },
		    
		    handleProgress: function(evt){
				var percentComplete = 0;
				console.log(evt);
				if (evt.lengthComputable) {  
				    percentComplete = evt.loaded / evt.total;
				    this.loaded = percentComplete;
					this.trigger('fetch:loading');
					console.log('Song Collection '+this._meta['orderby']+' Loaded: '+Math.round(percentComplete * 100)+"%");
				}else{
					console.warn('Song Collection: Cant get percent loaded');
				}
			}

        });

    return collection;

});