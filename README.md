Underscore.Templates
====================

This Underscore Mixin used for creating Sub Templates for Recursive Templates and for Merging Multiple Templates.

<h2>How it Works?</h2>
<p>This Mixin will store the Sub Templates data in to Custom Underscore Property called "_.tplBuffer" as a Array Object.</p>
<p>The Created Sub Templates will be used when you use Recursive Templates / Merge Templates.</p>

<h2>Available Mixins</h2>
<p>
<ol>
 <li>_.tpl()</li>
 <li>_.subTpl()</li>
 <li>_.recursiveTpl()</li>
 <li>_.mergeTpl() - (Coming Soon ...)</li>
</ol>
</p>

<h2>How to Use Sub Template then Merge to Main Template?.</h2>
<h4>1. Expected Output which has Header as Main Template and Menu as Sub Template</h4>
        <!-- Header (Main) Template Starts Here -->
        <header class="main-header">
            <nav id="menu" class="navbar navbar-default" role="navigation">
                <div class="navbar-header">
                    <a class="navbar-brand active" href="#">Site Name</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <!-- Menu (Sub) Template Starts Here -->
                    <ul class="nav navbar-nav">
                        <li><a href="#education">Education</a>
                        </li>
                        <li><a href="#">My Photos</a>
                        </li>
                    </ul>
                    <!-- Menu (Sub) Template Ends Here -->
                </div>
            </nav>
        </header>
        <!-- Header (Main) Template Ends Here -->

<h4>2. Creating Menu Template as Sub Template</h4>
        // `menu` variable is used as a Main Object inside Template.
        var tplData = "
            <ul class="nav navbar-nav">
                <% _.each(menu.items, function(item) { %>
                    <li><a href="#<%= item.href %>"> <%= item.title %> </a></li>
                <% }); %>
            </ul>
        ";

        // JSON Object of Template Data.
        var tplVars = {
            "items": [{
                "href": "#education",
                "title": "Education"
            },{
                "href": "#photos",
                "title": "My Photos"
            }]
        };

        // This will compile the Template and Store in to Template Buffer, which can be used while merge Templates.
        _.subTpl('menu', tplData, tplVars);
        
<h4>2. Creating Main Template as Header Template and Compiled Menu data Will be Available inside the Template.</h4>
        // `header` variable is used as a Main Object inside Template.
        // `header.menu` will be retrieved from Template Buffer and Added to Template JSON Data.
        var tplData = "
        <header class="main-header">
            <nav id="menu" class="navbar navbar-default" role="navigation">
                <div class="navbar-header">
                    <a class="navbar-brand active" href="#"><%= header.siteName %></a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <%= header.menu %>
                </div>
            </nav>
        </header>
        ";

        // JSON Object of Template Data.
        // `header.menu` will be retrieved from Template Buffer and Added to Template JSON Data.
        var tplVars = {
            "siteName": "Your Site Name"
        };

        // This will compile the Template and Merge dependent Templates from Buffer.
        _.dependentTpls('header', tplData, tplVars);
