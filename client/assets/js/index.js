const publicAPI = (function(io) {
    'use strict';

    const socket = io();

    const INITIAL_VALUES = {
        canvasWidth: 600,
        canvasHeight: 400,
        backgroundColor: 250,
        drawColor: 0,
        drawWeight: 10
    };

    const DRAW_ACTIONS = {
        draw: {
            actionKey: 'd',
            actionName: 'draw'
        },
        erase: {
            actionKey: 'e',
            actionName: 'erase'
            
        }
    };

    const DRAW_CONFIG = {
        color: INITIAL_VALUES.drawColor,
        weight: INITIAL_VALUES.drawWeight
    };

    let publicAPI;

    function setup() {
        setupCanvas();
        setupSocketEvents();
    }

    // Socket Events
    function setupSocketEvents() {
        socket.on('draw', drawLine);
    }

    function sendDraw(data) {
        socket.emit('draw', data);
    }

    // P5 js Events

    function setupCanvas() {
        createCanvas(INITIAL_VALUES.canvasWidth, INITIAL_VALUES.canvasHeight);
        background(INITIAL_VALUES.backgroundColor);
    }

    function executeDraw(action) {
        let data = {
            mouseX,
            mouseY,
            pmouseX,
            pmouseY,
            color: DRAW_CONFIG.color,
            weight: DRAW_CONFIG.weight
        };
        
        // draw to client
        drawLine(data);

        // draw to socket
        sendDraw(data);
    }

    function drawLine(props) {
        stroke(props.color);
        strokeWeight(props.weight);
        line(props.mouseX, props.mouseY, props.pmouseX, props.pmouseY);
    }

    function handleKeyPressed() {
        if (key === DRAW_ACTIONS.draw.actionKey) {
            if (DRAW_CONFIG.color === INITIAL_VALUES.backgroundColor) {
                DRAW_CONFIG.color = INITIAL_VALUES.drawColor;
            }
        }

        if (key === DRAW_ACTIONS.erase.actionKey) {
            DRAW_CONFIG.color = INITIAL_VALUES.backgroundColor;
        }
    }

    // DOM Events

    publicAPI = {
        setup,
        executeDraw,
        handleKeyPressed
    }

    return publicAPI;

}(io));

// P5 js functions

function setup() {
    publicAPI.setup();
}

function mouseDragged() {
    publicAPI.executeDraw();
}

function mousePressed() {
    publicAPI.executeDraw();
}

function keyPressed() {
    publicAPI.handleKeyPressed();
}




