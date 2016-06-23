
var width = 960,
    height = 840;

var force = d3.layout.force()   //  position linked nodes using physical simulation
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset(function(d) {
        return [flags.find(ctry => ctry.code === d.code).minY - 1, 
                flags.find(ctry => ctry.code === d.code).minX - 100]
  })
  .html(function(d) {
    return  d.country ;
  })

var svg = d3.select(".graph").append("svg")
    .attr("width", width)
    .attr("height", height)
    //.attr("viewBox", "0 0 1024 768");

svg.call(tip)

d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", function(error, graph) {
  if (error) throw error;

  console.log(graph)
  
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();             //  start or restart the simulation when the nodes change.

  var link = svg.selectAll(".link")
      .data(graph.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  
     node.append("svg")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 16)
        .attr("height", 11)
        .attr("viewBox", function(d) { 
              var flag = flags.find(ctry => ctry.code === d.code)
              return ""+flag.minX+" "+flag.minY+" 16 11"
        })

       .append("svg:image")
        .attr("xlink:href", "https://dickyw.blob.core.windows.net/image/flags.png")
        .attr("width", 256)
        .attr("height", 176);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
  });
});

var flags = [
        {'code': 'ad', 'minX': 16, 'minY': 0},
        {'code': 'ae', 'minX': 32, 'minY': 0},
        {'code': 'af', 'minX': 48, 'minY': 0},
        {'code': 'ag', 'minX': 64, 'minY': 0},
        {'code': 'ai', 'minX': 80, 'minY': 0},
        {'code': 'al', 'minX': 96, 'minY': 0},
        {'code': 'am', 'minX': 112, 'minY': 0},
        {'code': 'an', 'minX': 128, 'minY': 0},
        {'code': 'ao', 'minX': 144, 'minY': 0},
        {'code': 'ar', 'minX': 160, 'minY': 0},
        {'code': 'as', 'minX': 176, 'minY': 0},
        {'code': 'at', 'minX': 192, 'minY': 0},
        {'code': 'au', 'minX': 208, 'minY': 0},
        {'code': 'aw', 'minX': 224, 'minY': 0},
        {'code': 'az', 'minX': 240, 'minY': 0},
        {'code': 'ba', 'minX': 0, 'minY': 11},
        {'code': 'bb', 'minX': 16, 'minY': 11},
        {'code': 'bd', 'minX': 32, 'minY': 11},
        {'code': 'be', 'minX': 48, 'minY': 11},
        {'code': 'bf', 'minX': 64, 'minY': 11},
        {'code': 'bg', 'minX': 80, 'minY': 11},
        {'code': 'bh', 'minX': 96, 'minY': 11},
        {'code': 'bi', 'minX': 112, 'minY': 11},
        {'code': 'bj', 'minX': 128, 'minY': 11},
        {'code': 'bm', 'minX': 144, 'minY': 11},
        {'code': 'bn', 'minX': 160, 'minY': 11},
        {'code': 'bo', 'minX': 176, 'minY': 11},
        {'code': 'br', 'minX': 192, 'minY': 11},
        {'code': 'bs', 'minX': 208, 'minY': 11},
        {'code': 'bt', 'minX': 224, 'minY': 11},
        {'code': 'bv', 'minX': 240, 'minY': 11},
        {'code': 'bw', 'minX': 0, 'minY': 22},
        {'code': 'by', 'minX': 16, 'minY': 22},
        {'code': 'bz', 'minX': 32, 'minY': 22},
        {'code': 'ca', 'minX': 48, 'minY': 22},
        {'code': 'catalonia', 'minX': 64, 'minY': 22},
        {'code': 'cd', 'minX': 80, 'minY': 22},
        {'code': 'cf', 'minX': 96, 'minY': 22},
        {'code': 'cg', 'minX': 112, 'minY': 22},
        {'code': 'ch', 'minX': 128, 'minY': 22},
        {'code': 'ci', 'minX': 144, 'minY': 22},
        {'code': 'ck', 'minX': 160, 'minY': 22},
        {'code': 'cl', 'minX': 176, 'minY': 22},
        {'code': 'cm', 'minX': 192, 'minY': 22},
        {'code': 'cn', 'minX': 208, 'minY': 22},
        {'code': 'co', 'minX': 224, 'minY': 22},
        {'code': 'cr', 'minX': 240, 'minY': 22},
        {'code': 'cu', 'minX': 0, 'minY': 33},
        {'code': 'cv', 'minX': 16, 'minY': 33},
        {'code': 'cw', 'minX': 32, 'minY': 33},
        {'code': 'cy', 'minX': 48, 'minY': 33},
        {'code': 'cz', 'minX': 64, 'minY': 33},
        {'code': 'de', 'minX': 80, 'minY': 33},
        {'code': 'dj', 'minX': 96, 'minY': 33},
        {'code': 'dk', 'minX': 112, 'minY': 33},
        {'code': 'dm', 'minX': 128, 'minY': 33},
        {'code': 'do', 'minX': 144, 'minY': 33},
        {'code': 'dz', 'minX': 160, 'minY': 33},
        {'code': 'ec', 'minX': 176, 'minY': 33},
        {'code': 'ee', 'minX': 192, 'minY': 33},
        {'code': 'eg', 'minX': 208, 'minY': 33},
        {'code': 'eh', 'minX': 224, 'minY': 33},
        {'code': 'england', 'minX': 240, 'minY': 33},
        {'code': 'er', 'minX': 0, 'minY': 44},
        {'code': 'es', 'minX': 16, 'minY': 44},
        {'code': 'et', 'minX': 32, 'minY': 44},
        {'code': 'eu', 'minX': 48, 'minY': 44},
        {'code': 'fi', 'minX': 64, 'minY': 44},
        {'code': 'fj', 'minX': 80, 'minY': 44},
        {'code': 'fk', 'minX': 96, 'minY': 44},
        {'code': 'fm', 'minX': 112, 'minY': 44},
        {'code': 'fo', 'minX': 128, 'minY': 44},
        {'code': 'fr', 'minX': 144, 'minY': 44},
        {'code': 'ga', 'minX': 160, 'minY': 44},
        {'code': 'gb', 'minX': 176, 'minY': 44},
        {'code': 'gd', 'minX': 192, 'minY': 44},
        {'code': 'ge', 'minX': 208, 'minY': 44},
        {'code': 'gf', 'minX': 224, 'minY': 44},
        {'code': 'gg', 'minX': 240, 'minY': 44},
        {'code': 'gh', 'minX': 0, 'minY': 55},
        {'code': 'gi', 'minX': 16, 'minY': 55},
        {'code': 'gl', 'minX': 32, 'minY': 55},
        {'code': 'gm', 'minX': 48, 'minY': 55},
        {'code': 'gn', 'minX': 64, 'minY': 55},
        {'code': 'gp', 'minX': 80, 'minY': 55},
        {'code': 'gq', 'minX': 96, 'minY': 55},
        {'code': 'gr', 'minX': 112, 'minY': 55},
        {'code': 'gs', 'minX': 128, 'minY': 55},
        {'code': 'gt', 'minX': 144, 'minY': 55},
        {'code': 'gu', 'minX': 160, 'minY': 55},
        {'code': 'gw', 'minX': 176, 'minY': 55},
        {'code': 'gy', 'minX': 192, 'minY': 55},
        {'code': 'hk', 'minX': 208, 'minY': 55},
        {'code': 'hm', 'minX': 224, 'minY': 55},
        {'code': 'hn', 'minX': 240, 'minY': 55},
        {'code': 'hr', 'minX': 0, 'minY': 66},
        {'code': 'ht', 'minX': 16, 'minY': 66},
        {'code': 'hu', 'minX': 32, 'minY': 66},
        {'code': 'ic', 'minX': 48, 'minY': 66},
        {'code': 'id', 'minX': 64, 'minY': 66},
        {'code': 'ie', 'minX': 80, 'minY': 66},
        {'code': 'il', 'minX': 96, 'minY': 66},
        {'code': 'im', 'minX': 112, 'minY': 66},
        {'code': 'in', 'minX': 128, 'minY': 66},
        {'code': 'io', 'minX': 144, 'minY': 66},
        {'code': 'iq', 'minX': 160, 'minY': 66},
        {'code': 'ir', 'minX': 176, 'minY': 66},
        {'code': 'is', 'minX': 192, 'minY': 66},
        {'code': 'it', 'minX': 208, 'minY': 66},
        {'code': 'je', 'minX': 224, 'minY': 66},
        {'code': 'jm', 'minX': 240, 'minY': 66},
        {'code': 'jo', 'minX': 0, 'minY': 77},
        {'code': 'jp', 'minX': 16, 'minY': 77},
        {'code': 'ke', 'minX': 32, 'minY': 77},
        {'code': 'kg', 'minX': 48, 'minY': 77},
        {'code': 'kh', 'minX': 64, 'minY': 77},
        {'code': 'ki', 'minX': 80, 'minY': 77},
        {'code': 'km', 'minX': 96, 'minY': 77},
        {'code': 'kn', 'minX': 112, 'minY': 77},
        {'code': 'kp', 'minX': 128, 'minY': 77},
        {'code': 'kr', 'minX': 144, 'minY': 77},
        {'code': 'kurdistan', 'minX': 160, 'minY': 77},
        {'code': 'kw', 'minX': 176, 'minY': 77},
        {'code': 'ky', 'minX': 192, 'minY': 77},
        {'code': 'kz', 'minX': 208, 'minY': 77},
        {'code': 'la', 'minX': 224, 'minY': 77},
        {'code': 'lb', 'minX': 240, 'minY': 77},
        {'code': 'lc', 'minX': 0, 'minY': 88},
        {'code': 'li', 'minX': 16, 'minY': 88},
        {'code': 'lk', 'minX': 32, 'minY': 88},
        {'code': 'lr', 'minX': 48, 'minY': 88},
        {'code': 'ls', 'minX': 64, 'minY': 88},
        {'code': 'lt', 'minX': 80, 'minY': 88},
        {'code': 'lu', 'minX': 96, 'minY': 88},
        {'code': 'lv', 'minX': 112, 'minY': 88},
        {'code': 'ly', 'minX': 128, 'minY': 88},
        {'code': 'ma', 'minX': 144, 'minY': 88},
        {'code': 'mc', 'minX': 160, 'minY': 88},
        {'code': 'md', 'minX': 176, 'minY': 88},
        {'code': 'me', 'minX': 192, 'minY': 88},
        {'code': 'mg', 'minX': 208, 'minY': 88},
        {'code': 'mh', 'minX': 224, 'minY': 88},
        {'code': 'mk', 'minX': 240, 'minY': 88},
        {'code': 'ml', 'minX': 0, 'minY': 99},
        {'code': 'mm', 'minX': 16, 'minY': 99},
        {'code': 'mn', 'minX': 32, 'minY': 99},
        {'code': 'mo', 'minX': 48, 'minY': 99},
        {'code': 'mp', 'minX': 64, 'minY': 99},
        {'code': 'mq', 'minX': 80, 'minY': 99},
        {'code': 'mr', 'minX': 96, 'minY': 99},
        {'code': 'ms', 'minX': 112, 'minY': 99},
        {'code': 'mt', 'minX': 128, 'minY': 99},
        {'code': 'mu', 'minX': 144, 'minY': 99},
        {'code': 'mv', 'minX': 160, 'minY': 99},
        {'code': 'mw', 'minX': 176, 'minY': 99},
        {'code': 'mx', 'minX': 192, 'minY': 99},
        {'code': 'my', 'minX': 208, 'minY': 99},
        {'code': 'mz', 'minX': 224, 'minY': 99},
        {'code': 'na', 'minX': 240, 'minY': 99},
        {'code': 'nc', 'minX': 0, 'minY': 110},
        {'code': 'ne', 'minX': 16, 'minY': 110},
        {'code': 'nf', 'minX': 32, 'minY': 110},
        {'code': 'ng', 'minX': 48, 'minY': 110},
        {'code': 'ni', 'minX': 64, 'minY': 110},
        {'code': 'nl', 'minX': 80, 'minY': 110},
        {'code': 'no', 'minX': 96, 'minY': 110},
        {'code': 'np', 'minX': 112, 'minY': 110},
        {'code': 'nr', 'minX': 128, 'minY': 110},
        {'code': 'nu', 'minX': 144, 'minY': 110},
        {'code': 'nz', 'minX': 160, 'minY': 110},
        {'code': 'om', 'minX': 176, 'minY': 110},
        {'code': 'pa', 'minX': 192, 'minY': 110},
        {'code': 'pe', 'minX': 208, 'minY': 110},
        {'code': 'pf', 'minX': 224, 'minY': 110},
        {'code': 'pg', 'minX': 240, 'minY': 110},
        {'code': 'ph', 'minX': 0, 'minY': 121},
        {'code': 'pk', 'minX': 16, 'minY': 121},
        {'code': 'pl', 'minX': 32, 'minY': 121},
        {'code': 'pm', 'minX': 48, 'minY': 121},
        {'code': 'pn', 'minX': 64, 'minY': 121},
        {'code': 'pr', 'minX': 80, 'minY': 121},
        {'code': 'ps', 'minX': 96, 'minY': 121},
        {'code': 'pt', 'minX': 112, 'minY': 121},
        {'code': 'pw', 'minX': 128, 'minY': 121},
        {'code': 'py', 'minX': 144, 'minY': 121},
        {'code': 'qa', 'minX': 160, 'minY': 121},
        {'code': 're', 'minX': 176, 'minY': 121},
        {'code': 'ro', 'minX': 192, 'minY': 121},
        {'code': 'rs', 'minX': 208, 'minY': 121},
        {'code': 'ru', 'minX': 224, 'minY': 121},
        {'code': 'rw', 'minX': 240, 'minY': 121},
        {'code': 'sa', 'minX': 0, 'minY': 132},
        {'code': 'sb', 'minX': 16, 'minY': 132},
        {'code': 'sc', 'minX': 32, 'minY': 132},
        {'code': 'scotland', 'minX': 48, 'minY': 132},
        {'code': 'sd', 'minX': 64, 'minY': 132},
        {'code': 'se', 'minX': 80, 'minY': 132},
        {'code': 'sg', 'minX': 96, 'minY': 132},
        {'code': 'sh', 'minX': 112, 'minY': 132},
        {'code': 'si', 'minX': 128, 'minY': 132},
        {'code': 'sk', 'minX': 144, 'minY': 132},
        {'code': 'sl', 'minX': 160, 'minY': 132},
        {'code': 'sm', 'minX': 176, 'minY': 132},
        {'code': 'sn', 'minX': 192, 'minY': 132},
        {'code': 'so', 'minX': 208, 'minY': 132},
        {'code': 'somaliland', 'minX': 224, 'minY': 132},
        {'code': 'sr', 'minX': 240, 'minY': 132},
        {'code': 'ss', 'minX': 0, 'minY': 143},
        {'code': 'st', 'minX': 16, 'minY': 143},
        {'code': 'sv', 'minX': 32, 'minY': 143},
        {'code': 'sx', 'minX': 48, 'minY': 143},
        {'code': 'sy', 'minX': 64, 'minY': 143},
        {'code': 'sz', 'minX': 80, 'minY': 143},
        {'code': 'tc', 'minX': 96, 'minY': 143},
        {'code': 'td', 'minX': 112, 'minY': 143},
        {'code': 'tf', 'minX': 128, 'minY': 143},
        {'code': 'tg', 'minX': 144, 'minY': 143},
        {'code': 'th', 'minX': 160, 'minY': 143},
        {'code': 'tibet', 'minX': 176, 'minY': 143},
        {'code': 'tj', 'minX': 192, 'minY': 143},
        {'code': 'tk', 'minX': 208, 'minY': 143},
        {'code': 'tl', 'minX': 224, 'minY': 143},
        {'code': 'tm', 'minX': 240, 'minY': 143},
        {'code': 'tn', 'minX': 0, 'minY': 154},
        {'code': 'to', 'minX': 16, 'minY': 154},
        {'code': 'tr', 'minX': 32, 'minY': 154},
        {'code': 'tt', 'minX': 48, 'minY': 154},
        {'code': 'tv', 'minX': 64, 'minY': 154},
        {'code': 'tw', 'minX': 80, 'minY': 154},
        {'code': 'tz', 'minX': 96, 'minY': 154},
        {'code': 'ua', 'minX': 112, 'minY': 154},
        {'code': 'ug', 'minX': 128, 'minY': 154},
        {'code': 'um', 'minX': 144, 'minY': 154},
        {'code': 'us', 'minX': 160, 'minY': 154},
        {'code': 'uy', 'minX': 176, 'minY': 154},
        {'code': 'uz', 'minX': 192, 'minY': 154},
        {'code': 'va', 'minX': 208, 'minY': 154},
        {'code': 'vc', 'minX': 224, 'minY': 154},
        {'code': 've', 'minX': 240, 'minY': 154},
        {'code': 'vg', 'minX': 0, 'minY': 165},
        {'code': 'vi', 'minX': 16, 'minY': 165},
        {'code': 'vn', 'minX': 32, 'minY': 165},
        {'code': 'vu', 'minX': 48, 'minY': 165},
        {'code': 'wales', 'minX': 64, 'minY': 165},
        {'code': 'wf', 'minX': 80, 'minY': 165},
        {'code': 'ws', 'minX': 96, 'minY': 165},
        {'code': 'xk', 'minX': 112, 'minY': 165},
        {'code': 'ye', 'minX': 128, 'minY': 165},
        {'code': 'yt', 'minX': 144, 'minY': 165},
        {'code': 'za', 'minX': 160, 'minY': 165},
        {'code': 'zanzibar', 'minX': 176, 'minY': 165},
        {'code': 'zm', 'minX': 192, 'minY': 165},
        {'code': 'zw', 'minX': 208, 'minY': 165}
        ]