let map = {
    cols: 12,
    rows: 12,
    tsize: 64,
    layers: [[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
        0, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0
    ], [
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]],
    getTile: (layer, col, row) => {
        return this.layers[layer][row * map.cols + col];
    }
};
function Camera(map, w, h) {
    this.x = 0;
    this.y = 0;
    this.width = w;
    this.height = h;
    this.maxX = map.cols * map.tsize - w;
    this.maxY = map.rows * map.tsize - h;
    
}