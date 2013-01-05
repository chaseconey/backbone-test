(function() {
	var Todo,
		Todos,
		TodoView,
		TodoListView;
		//TodoRouter;


	Todo = Backbone.Model.extend({
		defaults: {
			status: "open",
			todo: ""
		},

		complete: function() {
			this.set({status: "closed"});
		}
	});

	Todos = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("Todos")

	});

	TodoView = Backbone.View.extend({
		className: "todo",

		initialize: function() {
			_.bindAll(this);
		},

		render: function() {
			var ele = $("<li></li>", {
				text: this.model.get("status") + ": " + this.model.get("todo")
			});

			this.$el.html(ele);

			return this;
		}
	});

	TodoListView = Backbone.View.extend({
		tagName: "ul",
		className: "todo-list",

		initialize : function() {
			_.bindAll(this);
			this.listenTo(this.collection, "add reset", this.render);
		},

		render: function() {
			var self = this;

			this.$el.empty();
			this.collection.each(function(todo) {
				var view = new TodoView({
					model: todo
				});

				self.$el.append(view.render().el);
			});

			return this;

		}
	});


	$(function() {
		var collection = new Todos(),
			view = new TodoListView({
				collection: collection
			});
		collection.fetch();
		$("#main").append(view.render().el);
		$("#main form").submit(function(e) {
			console.log(collection);
			e.preventDefault();
			collection.create({
				status: $("input[name='status']").val() ? "open" : "closed",
				todo: $("input[name='todo']").val()
			});

			return false;
		})
	});

	//TodoRouter = Backbone.Router.extend({});
})();