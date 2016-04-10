(function() {

var todoLastId = 1;

function TodoItem(text) {
    this.id = todoLastId ++;
    this.text = text;
    this.done = false;
};

TodoItem.prototype.isDone = function() {
    return this.done;
};

TodoItem.prototype.setDone = function() {
    this.done = true;
};

TodoItem.prototype.setUndone = function() {
    this.done = false;
};

function TodoList() {
    this.items = [];
};

TodoList.prototype.add = function(text) {
    var item = new TodoItem(text);
    this.items.push(item);
};

TodoList.prototype.remove = function(item) {
    var newItems = [];
    for(var i = 0; i < this.items.length; i++) {
        if(this.items[i].id != item.id) newItems.push(this.items[i]);
    }
    this.items = newItems;
};

TodoList.prototype.removeDone = function() {
    var newItems = [];
    for(var i = 0; i < this.items.length; i++) {
        if(!this.items[i].isDone()) newItems.push(this.items[i]);
    }
    this.items = newItems;
};

TodoList.prototype.getItems = function() {
    return this.items;
};

angular.module('sandbox', [])
.controller('TodoController', function() {
    this.items = new TodoList();
    this.items.add("Sample Task to do");
})
.controller('ListController', function($scope) {
    $scope.newItemText = "";
    $scope.items = new TodoList();

    $scope.getItems = function() {
        return $scope.items.getItems();
    };

    $scope.addNewItem = function() {
        $scope.items.add($scope.newItemText);
        $scope.newItemText = "";
    };

    $scope.remove = function(item) {
        $scope.items.remove(item);
    };

    $scope.removeDone = function() {
        $scope.items.removeDone();
    };

    $scope.setDone = function(item) {
        item.setDone();
    };

    $scope.setUndone = function(item) {
        item.setUndone();
    };
})
.directive('list', function() {
    return {
        restrict: 'E',
        templateUrl: 'list.html',
        scope: {
            items: '='
        },
        controller: 'ListController'
    }
})
.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

})();
