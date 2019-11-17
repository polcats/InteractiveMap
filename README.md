# InteractiveSvgMap
An <a href="https://slu-map.000webhostapp.com/">Interactive SVG Map</a> parsed from JSON files

This is a framework that can generate an interactive SVG map by loading data points from external files.

<h2>Map Data Files</h2>
<ul>
    <li>Entry/Exit - The entry and exit points of a building.</li>
    <li>Labels - The names of the different buildings/areas.</li>
    <li>Map Data - The collective file for the buildings, pathways/floors, gates, etc.</li>
    <li>Paths - The paths from one location to another.</li>
    <li>Points of Interest - The useful locations available in the map. </li>
</ul>

<h4>How was the map created</h4>
The large chunk of the map data was created using Adobe Illustrator:
<ul>
    <li>Labels</li>
    <li>Map Data</li>
</ul>

The rest were created either by using a generator or by manual plotting (they mostly use common points):
<ul>
    <li>Entry/Exit</li>
    <li>Paths</li>
    <li>Points of Interest</li>
</ul>

<h2>What else can be done</h2>
<ul>
    <li>Add the old generator for the paths.</li>
    <li>Add support for loading different formats of data files.</li>
</ul>
