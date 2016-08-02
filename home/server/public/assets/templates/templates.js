angular.module("home.templates", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("details/details.html", "<div ng-controller=detailsController class=col-md-12><p>Stock Details</p></div>");
    $templateCache.put("home/home-container.html", "<div ng-controller=homeController class=\"home col-md-12\" ng-init=getStocks()><div ng-repeat=\"stock in stocks\"><stock-item stock=stock prevstock><stock-item></stock-item></stock-item></div></div>");
    $templateCache.put("pages/about.html", "<div ng-controller=detailsController class=col-md-12><p>About Us</p></div>");
    $templateCache.put("pages/buy.html", "<div class=col-md-12><p>Buy Stocks</p></div>");
    $templateCache.put("stocks/stock-item.html", "<div class=stock-item ng-init=fetchStocks()><div class=\"img col-md-4\" style=background-image:url(/home/static/1.2.11/images/{{backgroundImg}})></div><div class=\"title col-md-2\">{{stock.name}}</div><div class=\"details col-md-4\">Price : {{stock.price}} | Change : <span ng-if=\"stock.prevPrice!=\'\'\">{{(((stock.prevPrice - stock.price)/stock.price) * 100).toFixed(1)}} %</span> <span ng-if=\"stock.prevPrice==\'\'\">None</span></div><div class=\"more col-md-2\"><a class=btn href=#stock/{{stock.id}}>More</a></div><div style=clear:both></div></div>");
    $templateCache.put("top-nav/top-nav.html", "<div class=\"top-nav col-md-12\"><div class=\"col-md-12 top-line\"></div><div class=\"col-md-1 menu-item\" ng-click=\"click(\'/hometab\')\">Home</div><div class=\"col-md-1 menu-item\" ng-click=\"click(\'/buy\')\">Buy</div><div class=\"col-md-1 menu-item\" ng-click=\"click(\'/about\')\">About</div></div><div class=\"bottom-line col-md-12\"><div class=\"col-md-1 menu-item\"><button class=\"btn danger\" ng-click=signOut()>Sign Out</button></div></div>");
}]);