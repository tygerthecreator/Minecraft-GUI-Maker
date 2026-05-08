const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasWrap = document.getElementById("canvasWrap");

const widthInput = document.getElementById("guiWidthInput");
const heightInput = document.getElementById("guiHeightInput");
const addSlotButton = document.getElementById("addSlotButton");
const duplicateSelectionButton = document.getElementById("duplicateSelectionButton");
const downloadButton = document.getElementById("downloadButton");
const exportLayoutButton = document.getElementById("exportLayoutButton");
const saveProjectButton = document.getElementById("saveProjectButton");
const loadProjectButton = document.getElementById("loadProjectButton");
const templateSelect = document.getElementById("templateSelect");
const loadTemplateButton = document.getElementById("loadTemplateButton");
const imageInput = document.getElementById("imageInput");
const projectInput = document.getElementById("projectInput");
const addTextButton = document.getElementById("addTextButton");
const textValueInput = document.getElementById("textValueInput");
const textSizeInput = document.getElementById("textSizeInput");
const textColorInput = document.getElementById("textColorInput");
const fontInput = document.getElementById("fontInput");
const fontStatus = document.getElementById("fontStatus");
const deleteSelectionButton = document.getElementById("deleteSelectionButton");
const selectionXInput = document.getElementById("selectionXInput");
const selectionYInput = document.getElementById("selectionYInput");
const absoluteXInput = document.getElementById("absoluteXInput");
const absoluteYInput = document.getElementById("absoluteYInput");
const sendBackwardButton = document.getElementById("sendBackwardButton");
const bringForwardButton = document.getElementById("bringForwardButton");
const slotVisibleInput = document.getElementById("slotVisibleInput");
const slotIconInput = document.getElementById("slotIconInput");
const clearSlotIconButton = document.getElementById("clearSlotIconButton");
const slotIconStatus = document.getElementById("slotIconStatus");
const stageSize = document.getElementById("stageSize");
const zoomOutButton = document.getElementById("zoomOutButton");
const zoomInButton = document.getElementById("zoomInButton");
const zoomFitButton = document.getElementById("zoomFitButton");
const zoomValue = document.getElementById("zoomValue");

ctx.imageSmoothingEnabled = false;

const atlas = new Image();
atlas.src = "assets/atlas.png";

const SCALE = 3;
const TILE_ATLAS_SIZE = 4;
const TILE_SIZE = TILE_ATLAS_SIZE * SCALE;
const FRAME_ATLAS_SIZE = TILE_ATLAS_SIZE * 2;
const MIN_GUI_SIZE = FRAME_ATLAS_SIZE;
const MAX_GUI_SIZE = 256;
const SLOT_ATLAS_X = 4;
const SLOT_ATLAS_Y = 0;
const SLOT_ATLAS_SIZE = 18;
const SLOT_POSITION_OFFSET = 1;
const SLOT_ICON_OFFSET = 1;
const SLOT_ICON_SIZE = SLOT_ATLAS_SIZE - SLOT_ICON_OFFSET * 2;
const SLOT_SIZE = SLOT_ATLAS_SIZE * SCALE;
const DEFAULT_TEXT_FONT_NAME = "Silkscreen";
const DEFAULT_TEXT_FONT_FAMILY = "Silkscreen";
const TEXT_DEFAULT_SIZE = 8;
const TEXT_MIN_SIZE = 4;
const TEXT_MAX_SIZE = 32;
const TEXT_DEFAULT_COLOR = "#404040";

const START_X = 12;
const START_Y = 12;
const DUPLICATE_OFFSET = 4;
const MAX_EDITOR_ZOOM = 8;
const ZOOM_STEP = 1.25;

const COLORS = {
    black: "#000000",
    dark: "#474747",
    gray: "#c7c7c7",
    white: "#ffffff",
};

const BUILT_IN_TEMPLATES = [
    {
        id: "inventory_gui",
        name: "Inventory GUI",
        path: "templates/inventory_gui_template.json",
        data: {
            version: 1,
            width: 176,
            height: 166,
            slots: [
                { x: 3, y: 137 },
                { x: 21, y: 137 },
                { x: 39, y: 137 },
                { x: 57, y: 137 },
                { x: 75, y: 137 },
                { x: 93, y: 137 },
                { x: 111, y: 137 },
                { x: 129, y: 137 },
                { x: 147, y: 137 },
                { x: 3, y: 79 },
                { x: 21, y: 79 },
                { x: 39, y: 79 },
                { x: 57, y: 79 },
                { x: 75, y: 79 },
                { x: 93, y: 79 },
                { x: 111, y: 79 },
                { x: 129, y: 79 },
                { x: 147, y: 79 },
                { x: 3, y: 97 },
                { x: 21, y: 97 },
                { x: 39, y: 97 },
                { x: 57, y: 97 },
                { x: 75, y: 97 },
                { x: 93, y: 97 },
                { x: 111, y: 97 },
                { x: 129, y: 97 },
                { x: 147, y: 97 },
                { x: 3, y: 115 },
                { x: 21, y: 115 },
                { x: 39, y: 115 },
                { x: 57, y: 115 },
                { x: 75, y: 115 },
                { x: 93, y: 115 },
                { x: 111, y: 115 },
                { x: 129, y: 115 },
                { x: 147, y: 115 },
                { x: 3, y: 57 },
                { x: 3, y: 39 },
                { x: 3, y: 21 },
                { x: 3, y: 3 },
                { x: 72, y: 57 },
                { x: 93, y: 13 },
                { x: 111, y: 13 },
                { x: 93, y: 31 },
                { x: 111, y: 31 },
                { x: 149, y: 23 },
            ],
            images: [
                {
                    name: "inventory_avatar_preview.png",
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAABICAYAAABbRM0oAAAA8klEQVR4AezS0QnEIBBFUUlTaSSlpAsrsyo3szDgtxC5kbvsYH6Mz3dynOfZd5haaz/K82utla/Pfd/lf5nnPlv8vQyVURllFjTgZ7ag5KkjlJmqbcEmZRaUPHWEMlO1dikzIKSp45QZqq2lzfF65WJFoijDFElMikTLRBHGaJKZFImWiCOMkSVyKRMtEAcZYgqkUmZaIE4ytBUMo8y2QRtVYYmknmUySZoqzI0kcyjTDZBW5WhiWQeZbIJ2qoMTSTzKJNN0FZlSCJjFmXGNkjPypA0xizKjG2QnpUhaYxZlBnbID3vJXNdV+m9f37iC/kBAAD//09u0SUAAAAGSURBVAMA0VtdeBmortQAAAAASUVORK5CYII=",
                    x: 21,
                    y: 3,
                    width: 51,
                    height: 72,
                },
                {
                    name: "inventory_arrow.png",
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAAAXElEQVR4AaSPQQpAIQgF//fOnsJDF7MIQpLUgtdCnFHlSzwzG1FbSgAcSdKCSFISnCRlgZcIt90C5ANDrbUBIEHyJFDVX/huYZoPDLXWBgtuCXa4LPBwSXCCEUwAAAD//7QxJ50AAAAGSURBVAMA+6g+uy0Yh2kAAAAASUVORK5CYII=",
                    x: 131,
                    y: 25,
                    width: 16,
                    height: 13,
                },
                {
                    name: "inventory_slot_shield.png",
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVR4AazOSQrDQAxE0SS3yC7k/mcK2fkYNq+hTHue4SPJVarW63HxWw14f74t1t6YBFgIzf/3RGZ1HNYHEGEhxJxZ5UG0EuAHERGWKg/s8JQAzVlKQJ24J8jrdnhLgOYs9wU4yWlbl/DwxnffBUk8WgcXOM2JSyE0nlofBBAYGGGGHjRzzSSAyAhL0IM2ZjYgJkvIPFc7AAAA//9b9WgNAAAABklEQVQDAMxSaCEEjDH/AAAAAElFTkSuQmCC",
                    x: 73,
                    y: 58,
                    width: 16,
                    height: 16,
                },
                {
                    name: "inventory_slot_boots.png",
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVR4AdzQQQqEMBBE0Zm5xezE+59J3HkM5QVKWhBE3YiBojvVPwXp3+fmeWDAv+vnKL/LXY2XuvkCYBqHLwVI5REmnroJYJzVmwIsx5KOdoDBhms7YBjEPKpYb3AtQFNlCIqn5+Ve6xoAiDyokJ6XucqjFmBYZbCnyugxLUBzVbcDFgAAAP//UXpOfAAAAAZJREFUAwDBgVAhbrbesAAAAABJRU5ErkJggg==",
                    x: 4,
                    y: 58,
                    width: 16,
                    height: 16,
                },
                {
                    name: "inventory_slot_legs.png",
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVR4AeyRUQqAQAhErVv0F93/TNFfxyjex8AqKEG7f7sw6I46DLraz9dfYNuPp0I07BwweF/nUoGeVsQJtIWv+VgB7ILKTeqAQe2CPBNJBbKByE8Bs/474GQgbhsORN450N0V1ay/onjiCwAA//9KUnfxAAAABklEQVQDAL1fSCFKU0H3AAAAAElFTkSuQmCC",
                    x: 4,
                    y: 40,
                    width: 16,
                    height: 16,
                },
                {
                    name: "inventory_slot_chest.png",
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVR4AayPSwqAMBBD1Vu4E+9/JnHnMZRXiJR+Bj8phA6dl5BOw8/jD5iX9YxUFr4byHTs2xhJnIJSAI8yadG7xeGBSQEMX+UJoJYqPWkCiwfW04AkEklmjgQDK8bXQIlvb28D/sYfey3YweT7qgEAYEvscjNzFcAjYEvsSl0AAAD//3IDl/QAAAAGSURBVAMAS2FoIVIv5LQAAAAASUVORK5CYII=",
                    x: 4,
                    y: 22,
                    width: 16,
                    height: 16,
                },
                {
                    name: "inventory_slot_head.png",
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAj0lEQVR4AczPQQqEQAwEwN39xd7E/79JvPkMpQ6BmUw8iAgONJl0Op3k97n5Xmrwn+a9QnXtcILGbV2+FdSySWdAoDGLIlejiVzsDBBX8YyBNSG28YfI21hu4FYIoT9E3sbOgOhskiY1Gv9AZxDklTgYmGBSNsGpZX4wICDU0AKnllEaEGlogatwalCJK+4AAAD//xB4gTYAAAAGSURBVAMAkaJYIVdpo6MAAAAASUVORK5CYII=",
                    x: 4,
                    y: 4,
                    width: 16,
                    height: 16,
                },
            ],
            texts: [
                {
                    text: "Crafting",
                    x: 92,
                    y: 2,
                    fontSize: 8,
                    color: "#404040",
                },
            ],
        },
    },
];

let availableTemplates = [];
let atlasLoaded = false;
let fontLoaded = false;
let nextSlotId = 1;
let nextImageId = 1;
let nextTextId = 1;
let nextLayer = 1;
let activeDrag = null;
let editorZoom = 1;
let isFitZoom = true;
let nextCustomFontId = 1;
let activeTextFont = {
    name: DEFAULT_TEXT_FONT_NAME,
    family: DEFAULT_TEXT_FONT_FAMILY,
    src: null,
};
const selectedItems = [];
const slots = [];
const images = [];
const texts = [];

const defaultFontReady = loadDefaultTextFont();

defaultFontReady
    .catch(() => null)
    .then(() => {
        fontLoaded = true;
        clampItems();
        syncSelectionControls();
        render();
    });

function fill(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawTile(srcX, srcY, destX, destY) {
    ctx.drawImage(
        atlas,
        srcX,
        srcY,
        TILE_ATLAS_SIZE,
        TILE_ATLAS_SIZE,
        destX,
        destY,
        TILE_SIZE,
        TILE_SIZE
    );
}

function drawHorizontalStrip(x, y, width, colors) {
    colors.forEach(([color, row, rows]) => {
        fill(color, x, y + row * SCALE, width, rows * SCALE);
    });
}

function drawVerticalStrip(x, y, height, colors) {
    colors.forEach(([color, col, cols]) => {
        fill(color, x + col * SCALE, y, cols * SCALE, height);
    });
}

function drawGuiFrame(x, y, width, height) {
    const left = x;
    const top = y;
    const right = x + width + TILE_SIZE;
    const bottom = y + height + TILE_SIZE;

    const innerX = x + TILE_SIZE;
    const innerY = y + TILE_SIZE;

    drawHorizontalStrip(innerX, top, width, [
        [COLORS.black, 0, 1],
        [COLORS.white, 1, 2],
        [COLORS.gray, 3, 1],
    ]);

    drawVerticalStrip(left, innerY, height, [
        [COLORS.black, 0, 1],
        [COLORS.white, 1, 2],
        [COLORS.gray, 3, 1],
    ]);

    drawVerticalStrip(right, innerY, height, [
        [COLORS.gray, 0, 1],
        [COLORS.dark, 1, 2],
        [COLORS.black, 3, 1],
    ]);

    drawHorizontalStrip(innerX, bottom, width, [
        [COLORS.gray, 0, 1],
        [COLORS.dark, 1, 2],
        [COLORS.black, 3, 1],
    ]);

    drawTile(0, 0, left, top);
    drawTile(0, 12, right, top);
    drawTile(0, 8, right, bottom);
    drawTile(0, 4, left, bottom);

    fill(COLORS.gray, innerX, innerY, width, height);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getFitZoom() {
    const availableWidth = Math.max(1, canvasWrap.clientWidth - 32);
    const availableHeight = Math.max(1, canvasWrap.clientHeight - 32);

    return Math.min(
        1,
        availableWidth / canvas.width,
        availableHeight / canvas.height
    );
}

function updateZoomDisplay() {
    zoomValue.textContent = isFitZoom
        ? "Fit"
        : `${Math.round(editorZoom * 100)}%`;
}

function applyEditorZoom(nextZoom, keepCenter = true) {
    const fitZoom = getFitZoom();
    const previousWidth = canvas.offsetWidth || canvas.width * editorZoom;
    const previousHeight = canvas.offsetHeight || canvas.height * editorZoom;
    const centerX = canvasWrap.scrollLeft + canvasWrap.clientWidth / 2;
    const centerY = canvasWrap.scrollTop + canvasWrap.clientHeight / 2;
    const ratioX = previousWidth > 0 ? centerX / previousWidth : 0.5;
    const ratioY = previousHeight > 0 ? centerY / previousHeight : 0.5;

    editorZoom = clamp(nextZoom, fitZoom, MAX_EDITOR_ZOOM);
    canvas.style.width = `${canvas.width * editorZoom}px`;
    canvas.style.height = `${canvas.height * editorZoom}px`;

    if (keepCenter) {
        canvasWrap.scrollLeft = ratioX * canvas.offsetWidth - canvasWrap.clientWidth / 2;
        canvasWrap.scrollTop = ratioY * canvas.offsetHeight - canvasWrap.clientHeight / 2;
    }

    updateZoomDisplay();
}

function fitEditorZoom() {
    isFitZoom = true;
    applyEditorZoom(getFitZoom(), false);
}

function zoomEditor(multiplier) {
    isFitZoom = false;
    applyEditorZoom(editorZoom * multiplier);
}

function handleZoomWheel(event) {
    if (!event.ctrlKey) return;

    event.preventDefault();
    zoomEditor(event.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP);
}

function getGuiSize() {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    return {
        width: clamp(
            Number.isNaN(width) ? MIN_GUI_SIZE : width,
            MIN_GUI_SIZE,
            MAX_GUI_SIZE
        ),
        height: clamp(
            Number.isNaN(height) ? MIN_GUI_SIZE : height,
            MIN_GUI_SIZE,
            MAX_GUI_SIZE
        ),
    };
}

function getGuiInnerSize() {
    const { width, height } = getGuiSize();

    return {
        width: Math.max(0, width - FRAME_ATLAS_SIZE),
        height: Math.max(0, height - FRAME_ATLAS_SIZE),
    };
}

function getInputSize() {
    const { width, height } = getGuiInnerSize();

    return {
        width: width * SCALE,
        height: height * SCALE,
    };
}

function getGuiInnerBounds() {
    const { width, height } = getInputSize();

    return {
        x: START_X + TILE_SIZE,
        y: START_Y + TILE_SIZE,
        width,
        height,
    };
}

function getOriginalExportSize() {
    const { width, height } = getGuiSize();

    return {
        width,
        height,
    };
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function sameItem(first, second) {
    return Boolean(
        first &&
        second &&
        first.type === second.type &&
        first.id === second.id
    );
}

function getItemCollection(type) {
    if (type === "slot") return slots;
    if (type === "image") return images;
    if (type === "text") return texts;

    return [];
}

function escapeFontFamily(fontFamily) {
    return String(fontFamily || DEFAULT_TEXT_FONT_FAMILY).replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}

function updateFontStatus() {
    if (!fontStatus) return;

    fontStatus.textContent = `Font: ${activeTextFont.name || DEFAULT_TEXT_FONT_NAME}`;
}

function getActiveTextFontName() {
    return activeTextFont.name || DEFAULT_TEXT_FONT_NAME;
}

function getActiveTextFontFamily() {
    return activeTextFont.family || DEFAULT_TEXT_FONT_FAMILY;
}

function getDefaultTextFont() {
    return {
        name: DEFAULT_TEXT_FONT_NAME,
        family: DEFAULT_TEXT_FONT_FAMILY,
        src: null,
    };
}

async function loadDefaultTextFont() {
    activeTextFont = getDefaultTextFont();

    if (document.fonts) {
        await document.fonts.load(`${TEXT_DEFAULT_SIZE}px "${escapeFontFamily(activeTextFont.family)}"`);
    }

    updateFontStatus();
}

function getFontNameFromFile(file) {
    return (file?.name || "Custom font").replace(/\.(ttf|otf|woff2?|font)$/i, "") || "Custom font";
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("error", () => reject(new Error("The font file could not be read.")));
        reader.readAsDataURL(file);
    });
}

async function loadFontFromSource(name, src) {
    if (!window.FontFace || !document.fonts) {
        throw new Error("This browser does not support custom font imports.");
    }

    const family = `ImportedPixelFont${nextCustomFontId}`;
    const fontFace = new FontFace(family, `url("${src}")`);

    nextCustomFontId += 1;
    await fontFace.load();
    document.fonts.add(fontFace);

    return {
        name: name || "Custom font",
        family,
        src,
    };
}

async function setActiveTextFont(textFont) {
    activeTextFont = textFont || getDefaultTextFont();
    fontLoaded = true;
    updateFontStatus();
    clampItems();
    syncSelectionControls();
    render();
}

async function importCustomFont(file) {
    if (!file) return;

    const src = await readFileAsDataUrl(file);
    const textFont = await loadFontFromSource(getFontNameFromFile(file), src);

    await setActiveTextFont(textFont);
}

async function loadProjectTextFont(project) {
    const projectFontName = project?.textFont?.name || DEFAULT_TEXT_FONT_NAME;

    if (projectFontName !== DEFAULT_TEXT_FONT_NAME && projectFontName === getActiveTextFontName()) {
        fontLoaded = true;
        updateFontStatus();
        return;
    }

    await loadDefaultTextFont();

    fontLoaded = true;
    updateFontStatus();
}

function getProjectTextFontData() {
    return {
        name: getActiveTextFontName(),
    };
}

function configureTextContext(context, fontSize, scale = 1) {
    context.font = `${fontSize * scale}px "${escapeFontFamily(getActiveTextFontFamily())}", monospace`;
    context.textAlign = "left";
    context.textBaseline = "alphabetic";
}

function measureTextItem(textItem) {
    const text = textItem?.text || " ";
    const fontSize = textItem?.fontSize || TEXT_DEFAULT_SIZE;

    ctx.save();
    configureTextContext(ctx, fontSize);

    const metrics = ctx.measureText(text);
    const left = Math.ceil(Math.max(0, metrics.actualBoundingBoxLeft || 0));
    const right = Math.ceil(Math.max(metrics.width, metrics.actualBoundingBoxRight || metrics.width));
    const ascent = Math.ceil(metrics.actualBoundingBoxAscent || fontSize);
    const descent = Math.ceil(metrics.actualBoundingBoxDescent || 0);
    const width = Math.ceil(left + right) || 1;
    const height = Math.ceil(ascent + descent) || fontSize;

    ctx.restore();

    return {
        width: Math.max(1, width),
        height: Math.max(1, height),
        left,
        ascent,
    };
}

function getColorRgb(color) {
    if (/^#[0-9a-f]{6}$/i.test(color)) {
        return {
            r: parseInt(color.slice(1, 3), 16),
            g: parseInt(color.slice(3, 5), 16),
            b: parseInt(color.slice(5, 7), 16),
        };
    }

    return { r: 64, g: 64, b: 64 };
}

function createPixelTextCanvas(textItem) {
    const size = measureTextItem(textItem);
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");
    const color = textItem.color || TEXT_DEFAULT_COLOR;
    const rgb = getColorRgb(color);

    textCanvas.width = size.width;
    textCanvas.height = size.height;
    textCtx.imageSmoothingEnabled = false;
    configureTextContext(textCtx, textItem.fontSize || TEXT_DEFAULT_SIZE);
    textCtx.fillStyle = color;
    textCtx.fillText(textItem.text || "", size.left, size.ascent);

    const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);

    for (let index = 0; index < imageData.data.length; index += 4) {
        const alpha = imageData.data[index + 3];

        if (alpha > 96) {
            imageData.data[index] = rgb.r;
            imageData.data[index + 1] = rgb.g;
            imageData.data[index + 2] = rgb.b;
            imageData.data[index + 3] = 255;
        } else {
            imageData.data[index + 3] = 0;
        }
    }

    textCtx.putImageData(imageData, 0, 0);

    return textCanvas;
}

function getItem(itemRef) {
    if (!itemRef) return null;
    const collection = getItemCollection(itemRef.type);

    return collection.find((item) => item.id === itemRef.id) || null;
}

function getItemSize(itemRef) {
    if (itemRef.type === "slot") {
        return {
            width: SLOT_ATLAS_SIZE,
            height: SLOT_ATLAS_SIZE,
        };
    }

    if (itemRef.type === "text") {
        return measureTextItem(getItem(itemRef));
    }

    const image = getItem(itemRef);

    return {
        width: image?.width || 1,
        height: image?.height || 1,
    };
}

function getAllItemRefs() {
    return [
        ...slots.map((slot) => ({ type: "slot", id: slot.id })),
        ...images.map((image) => ({ type: "image", id: image.id })),
        ...texts.map((text) => ({ type: "text", id: text.id })),
    ];
}

function isLayeredItemRef(itemRef) {
    return itemRef?.type === "image" || itemRef?.type === "text";
}

function getNextLayer() {
    const layer = nextLayer;

    nextLayer += 1;

    return layer;
}

function getItemKey(itemRef) {
    return `${itemRef.type}:${itemRef.id}`;
}

function getLayeredItemRefs() {
    return [
        ...images.map((image) => ({ type: "image", id: image.id })),
        ...texts.map((text) => ({ type: "text", id: text.id })),
    ].sort((first, second) => {
        const firstItem = getItem(first);
        const secondItem = getItem(second);

        return (firstItem?.layer || 0) - (secondItem?.layer || 0);
    });
}

function normalizeLayers() {
    applyLayerOrder(getLayeredItemRefs());
}

function hasLayeredSelection() {
    return selectedItems.some(isLayeredItemRef);
}

function applyLayerOrder(itemRefs) {
    itemRefs.forEach((itemRef, index) => {
        const item = getItem(itemRef);

        if (item) {
            item.layer = index + 1;
        }
    });

    nextLayer = itemRefs.length + 1;
}

function moveSelectedLayeredItems(direction) {
    const layeredSelection = selectedItems.filter(isLayeredItemRef);

    if (layeredSelection.length === 0) return;

    const layerOrder = getLayeredItemRefs();
    const selectedKeys = new Set(layeredSelection.map(getItemKey));

    if (direction > 0) {
        for (let index = layerOrder.length - 2; index >= 0; index -= 1) {
            const currentKey = getItemKey(layerOrder[index]);
            const nextKey = getItemKey(layerOrder[index + 1]);

            if (selectedKeys.has(currentKey) && !selectedKeys.has(nextKey)) {
                [layerOrder[index], layerOrder[index + 1]] = [layerOrder[index + 1], layerOrder[index]];
            }
        }
    } else {
        for (let index = 1; index < layerOrder.length; index += 1) {
            const currentKey = getItemKey(layerOrder[index]);
            const previousKey = getItemKey(layerOrder[index - 1]);

            if (selectedKeys.has(currentKey) && !selectedKeys.has(previousKey)) {
                [layerOrder[index], layerOrder[index - 1]] = [layerOrder[index - 1], layerOrder[index]];
            }
        }
    }

    applyLayerOrder(layerOrder);
    syncSelectionControls();
    render();
}

function clampItem(itemRef) {
    const item = getItem(itemRef);

    if (!item) return;

    const { width, height } = getGuiInnerSize();
    const itemSize = getItemSize(itemRef);
    const maxX = Math.max(0, width - itemSize.width);
    const maxY = Math.max(0, height - itemSize.height);

    item.x = clamp(Math.round(Number(item.x) || 0), 0, maxX);
    item.y = clamp(Math.round(Number(item.y) || 0), 0, maxY);
}

function clampItems() {
    getAllItemRefs().forEach(clampItem);
}

function getItemCanvasRect(itemRef) {
    const item = getItem(itemRef);
    const itemSize = getItemSize(itemRef);
    const bounds = getGuiInnerBounds();

    return {
        x: bounds.x + item.x * SCALE,
        y: bounds.y + item.y * SCALE,
        width: itemSize.width * SCALE,
        height: itemSize.height * SCALE,
    };
}

function getSelectionBounds() {
    const selectedRects = selectedItems
        .map((itemRef) => {
            const item = getItem(itemRef);
            const size = getItemSize(itemRef);

            if (!item) return null;

            return {
                x: item.x,
                y: item.y,
                right: item.x + size.width,
                bottom: item.y + size.height,
            };
        })
        .filter(Boolean);

    if (selectedRects.length === 0) return null;

    const x = Math.min(...selectedRects.map((rect) => rect.x));
    const y = Math.min(...selectedRects.map((rect) => rect.y));
    const right = Math.max(...selectedRects.map((rect) => rect.right));
    const bottom = Math.max(...selectedRects.map((rect) => rect.bottom));

    return {
        x,
        y,
        width: right - x,
        height: bottom - y,
    };
}

function getSelectionPositionOffset() {
    if (selectedItems.length === 1 && selectedItems[0].type === "slot") {
        return SLOT_POSITION_OFFSET;
    }

    return 0;
}

function isItemSelected(itemRef) {
    return selectedItems.some((selectedItem) => sameItem(selectedItem, itemRef));
}

function setSelection(itemRefs) {
    selectedItems.length = 0;

    itemRefs.forEach((itemRef) => {
        if (getItem(itemRef) && !isItemSelected(itemRef)) {
            selectedItems.push(itemRef);
        }
    });

    syncSelectionControls();
    render();
}

function drawSelectionOutline(rect, color) {
    const thickness = 2;

    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = color;
    ctx.fillRect(rect.x, rect.y, rect.width, thickness);
    ctx.fillRect(rect.x, rect.y, thickness, rect.height);
    ctx.fillRect(rect.x + rect.width - thickness, rect.y, thickness, rect.height);
    ctx.fillRect(rect.x, rect.y + rect.height - thickness, rect.width, thickness);
    ctx.restore();
}

function getSlotIconSize(slotIcon) {
    return {
        width: clamp(Math.round(Number(slotIcon?.width) || SLOT_ICON_SIZE), 1, SLOT_ICON_SIZE),
        height: clamp(Math.round(Number(slotIcon?.height) || SLOT_ICON_SIZE), 1, SLOT_ICON_SIZE),
    };
}

function drawSlotIconToContext(targetCtx, slot, x, y, scale = 1) {
    if (!slot.icon?.element) return;

    const iconSize = getSlotIconSize(slot.icon);
    const iconX = x + (SLOT_ICON_OFFSET + Math.floor((SLOT_ICON_SIZE - iconSize.width) / 2)) * scale;
    const iconY = y + (SLOT_ICON_OFFSET + Math.floor((SLOT_ICON_SIZE - iconSize.height) / 2)) * scale;

    targetCtx.save();
    targetCtx.imageSmoothingEnabled = false;
    targetCtx.drawImage(
        slot.icon.element,
        iconX,
        iconY,
        iconSize.width * scale,
        iconSize.height * scale
    );
    targetCtx.restore();
}

function drawSlot(slot, showSelection) {
    const itemRef = { type: "slot", id: slot.id };
    const rect = getItemCanvasRect(itemRef);

    if (slot.visible !== false) {
        ctx.drawImage(
            atlas,
            SLOT_ATLAS_X,
            SLOT_ATLAS_Y,
            SLOT_ATLAS_SIZE,
            SLOT_ATLAS_SIZE,
            rect.x,
            rect.y,
            SLOT_SIZE,
            SLOT_SIZE
        );

        drawSlotIconToContext(ctx, slot, rect.x, rect.y, SCALE);
    } else if (showSelection) {
        ctx.save();
        ctx.globalAlpha = 0.32;
        ctx.strokeStyle = "#ff7a45";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.strokeRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2);
        ctx.restore();
    }

    if (showSelection && isItemSelected(itemRef)) {
        drawSelectionOutline(rect, "#ffd84d");
    }
}

function drawCustomImage(imageItem, showSelection) {
    const itemRef = { type: "image", id: imageItem.id };
    const rect = getItemCanvasRect(itemRef);

    ctx.drawImage(
        imageItem.element,
        rect.x,
        rect.y,
        rect.width,
        rect.height
    );

    if (showSelection && isItemSelected(itemRef)) {
        drawSelectionOutline(rect, "#55d6ff");
    }
}

function drawTextItem(textItem, showSelection) {
    const itemRef = { type: "text", id: textItem.id };
    const rect = getItemCanvasRect(itemRef);
    const textCanvas = createPixelTextCanvas(textItem);

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
        textCanvas,
        rect.x,
        rect.y,
        textCanvas.width * SCALE,
        textCanvas.height * SCALE
    );
    ctx.restore();

    if (showSelection && isItemSelected(itemRef)) {
        drawSelectionOutline(rect, "#b45cff");
    }
}

function drawItems(showSelection) {
    const bounds = getGuiInnerBounds();

    ctx.save();
    ctx.beginPath();
    ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
    ctx.clip();

    getLayeredItemRefs().forEach((itemRef) => {
        const item = getItem(itemRef);

        if (!item) return;

        if (itemRef.type === "image") {
            drawCustomImage(item, showSelection);
        } else {
            drawTextItem(item, showSelection);
        }
    });

    slots.forEach((slot) => drawSlot(slot, showSelection));

    ctx.restore();
}

function getMarqueeRect() {
    if (activeDrag?.mode !== "box") return null;

    const x = Math.min(activeDrag.startPoint.x, activeDrag.currentPoint.x);
    const y = Math.min(activeDrag.startPoint.y, activeDrag.currentPoint.y);

    return {
        x,
        y,
        width: Math.abs(activeDrag.currentPoint.x - activeDrag.startPoint.x),
        height: Math.abs(activeDrag.currentPoint.y - activeDrag.startPoint.y),
    };
}

function drawMarquee() {
    const rect = getMarqueeRect();

    if (!rect) return;

    ctx.save();
    ctx.fillStyle = "rgba(85, 214, 255, 0.16)";
    ctx.strokeStyle = "#55d6ff";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 5]);
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    ctx.restore();
}

function syncSelectionControls() {
    const bounds = getSelectionBounds();
    const hasSelection = Boolean(bounds);
    const positionOffset = getSelectionPositionOffset();
    const { width, height } = getGuiSize();
    const innerSize = getGuiInnerSize();

    duplicateSelectionButton.disabled = !hasSelection;
    deleteSelectionButton.disabled = !hasSelection;
    selectionXInput.disabled = !hasSelection;
    selectionYInput.disabled = !hasSelection;
    absoluteXInput.disabled = true;
    absoluteYInput.disabled = true;
    sendBackwardButton.disabled = !hasSelection || !hasLayeredSelection();
    bringForwardButton.disabled = !hasSelection || !hasLayeredSelection();
    slotVisibleInput.disabled = !hasSelection || selectedItems.length !== 1 || selectedItems[0].type !== "slot";
    slotIconInput.disabled = slotVisibleInput.disabled;
    clearSlotIconButton.disabled = true;
    stageSize.textContent = hasSelection
        ? `${width} x ${height} px - selected ${bounds.width} x ${bounds.height}`
        : `${width} x ${height} px`;

    if (!hasSelection) {
        selectionXInput.value = 0;
        selectionYInput.value = 0;
        selectionXInput.max = 256;
        selectionYInput.max = 256;
        absoluteXInput.value = 0;
        absoluteYInput.value = 0;
        sendBackwardButton.disabled = true;
        bringForwardButton.disabled = true;
        slotVisibleInput.checked = true;
        slotIconInput.disabled = true;
        clearSlotIconButton.disabled = true;
        slotIconStatus.textContent = "Slot icon: none";
        return;
    }

    selectionXInput.max = Math.max(0, innerSize.width - bounds.width + positionOffset);
    selectionYInput.max = Math.max(0, innerSize.height - bounds.height + positionOffset);
    selectionXInput.value = bounds.x + positionOffset;
    selectionYInput.value = bounds.y + positionOffset;
    absoluteXInput.value = bounds.x + TILE_ATLAS_SIZE + positionOffset;
    absoluteYInput.value = bounds.y + TILE_ATLAS_SIZE + positionOffset;
    syncSlotControls();
    syncTextControls();
}

function getSelectedSlotItem() {
    if (selectedItems.length !== 1 || selectedItems[0].type !== "slot") {
        return null;
    }

    return getItem(selectedItems[0]);
}

function syncSlotControls() {
    const slot = getSelectedSlotItem();

    if (!slot) {
        slotVisibleInput.checked = true;
        slotIconInput.disabled = true;
        clearSlotIconButton.disabled = true;
        slotIconStatus.textContent = "Slot icon: none";
        return;
    }

    slotVisibleInput.checked = slot.visible !== false;
    slotIconInput.disabled = false;
    clearSlotIconButton.disabled = !slot.icon;
    slotIconStatus.textContent = slot.icon
        ? `Slot icon: ${slot.icon.name || "custom icon"}`
        : "Slot icon: none";
}

function getSelectedTextItem() {
    if (selectedItems.length !== 1 || selectedItems[0].type !== "text") {
        return null;
    }

    return getItem(selectedItems[0]);
}

function syncTextControls() {
    const textItem = getSelectedTextItem();

    if (!textItem) return;

    textValueInput.value = textItem.text;
    textSizeInput.value = textItem.fontSize;
    textColorInput.value = textItem.color;
}

function getTextInputOptions() {
    return {
        text: textValueInput.value || "Text",
        fontSize: clamp(
            Math.round(Number(textSizeInput.value) || TEXT_DEFAULT_SIZE),
            TEXT_MIN_SIZE,
            TEXT_MAX_SIZE
        ),
        color: textColorInput.value || TEXT_DEFAULT_COLOR,
    };
}

function addText() {
    const { width, height } = getGuiInnerSize();
    const textItem = {
        id: nextTextId,
        x: 0,
        y: 0,
        layer: getNextLayer(),
        ...getTextInputOptions(),
    };
    const size = measureTextItem(textItem);

    textItem.x = Math.floor((width - size.width) / 2);
    textItem.y = Math.floor((height - size.height) / 2);

    nextTextId += 1;
    texts.push(textItem);

    const itemRef = { type: "text", id: textItem.id };
    clampItem(itemRef);
    setSelection([itemRef]);
}

function updateSelectedTextFromInputs() {
    const textItem = getSelectedTextItem();

    if (!textItem) return;

    Object.assign(textItem, getTextInputOptions());
    clampItem({ type: "text", id: textItem.id });
    syncSelectionControls();
    render();
}

function updateSelectedSlotFromInputs() {
    const slot = getSelectedSlotItem();

    if (!slot) return;

    slot.visible = slotVisibleInput.checked;
    render();
}

async function importSelectedSlotIcon(file) {
    const slot = getSelectedSlotItem();

    if (!slot || !file) return;

    const src = await readFileAsDataUrl(file);
    const image = await loadImageFromSource(src);

    slot.icon = {
        name: file.name || "slot-icon",
        src,
        element: image,
        width: Math.min(image.naturalWidth || SLOT_ICON_SIZE, SLOT_ICON_SIZE),
        height: Math.min(image.naturalHeight || SLOT_ICON_SIZE, SLOT_ICON_SIZE),
    };

    syncSelectionControls();
    render();
}

function clearSelectedSlotIcon() {
    const slot = getSelectedSlotItem();

    if (!slot) return;

    slot.icon = null;
    syncSelectionControls();
    render();
}

function addSlot() {
    const { width, height } = getGuiInnerSize();
    const slot = {
        id: nextSlotId,
        x: Math.floor((width - SLOT_ATLAS_SIZE) / 2),
        y: Math.floor((height - SLOT_ATLAS_SIZE) / 2),
        visible: true,
    };

    nextSlotId += 1;
    slots.push(slot);

    const itemRef = { type: "slot", id: slot.id };
    clampItem(itemRef);
    setSelection([itemRef]);
}

function addCustomImage(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        const image = new Image();

        image.addEventListener("load", () => {
            const { width, height } = getGuiInnerSize();
            const imageItem = {
                id: nextImageId,
                element: image,
                name: file.name,
                src: reader.result,
                x: Math.floor((width - image.naturalWidth) / 2),
                y: Math.floor((height - image.naturalHeight) / 2),
                width: image.naturalWidth,
                height: image.naturalHeight,
                layer: getNextLayer(),
            };

            nextImageId += 1;
            images.push(imageItem);

            const itemRef = { type: "image", id: imageItem.id };
            clampItem(itemRef);
            setSelection([itemRef]);
        });

        image.src = reader.result;
    });

    reader.readAsDataURL(file);
}

function removeItemsFromCollection(collection, type, itemRefs) {
    for (let index = collection.length - 1; index >= 0; index -= 1) {
        const itemRef = {
            type,
            id: collection[index].id,
        };

        if (itemRefs.some((selectedItem) => sameItem(selectedItem, itemRef))) {
            collection.splice(index, 1);
        }
    }
}

function deleteSelectedItems() {
    if (selectedItems.length === 0) return;

    removeItemsFromCollection(slots, "slot", selectedItems);
    removeItemsFromCollection(images, "image", selectedItems);
    removeItemsFromCollection(texts, "text", selectedItems);
    normalizeLayers();
    setSelection([]);
}

function cloneItem(itemRef) {
    const item = getItem(itemRef);

    if (!item) return null;

    if (itemRef.type === "slot") {
        const slot = {
            id: nextSlotId,
            x: item.x,
            y: item.y,
            visible: item.visible !== false,
            icon: item.icon
                ? { ...item.icon }
                : null,
        };

        nextSlotId += 1;
        slots.push(slot);

        return { type: "slot", id: slot.id };
    }

    if (itemRef.type === "text") {
        const textItem = {
            id: nextTextId,
            text: item.text,
            fontSize: item.fontSize,
            color: item.color,
            x: item.x,
            y: item.y,
            layer: getNextLayer(),
        };

        nextTextId += 1;
        texts.push(textItem);

        return { type: "text", id: textItem.id };
    }

    const imageItem = {
        id: nextImageId,
        element: item.element,
        name: item.name,
        src: item.src,
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
        layer: getNextLayer(),
    };

    nextImageId += 1;
    images.push(imageItem);

    return { type: "image", id: imageItem.id };
}

function getDuplicateOffset(originals) {
    const forwardOffset = getAllowedDragDelta(
        originals,
        DUPLICATE_OFFSET,
        DUPLICATE_OFFSET
    );

    if (forwardOffset.x !== 0 || forwardOffset.y !== 0) {
        return forwardOffset;
    }

    return getAllowedDragDelta(
        originals,
        -DUPLICATE_OFFSET,
        -DUPLICATE_OFFSET
    );
}

function duplicateSelectedItems() {
    if (selectedItems.length === 0) return;

    const clonedItems = selectedItems
        .map(cloneItem)
        .filter(Boolean);

    const originals = clonedItems.map((itemRef) => {
        const item = getItem(itemRef);

        return {
            itemRef,
            x: item.x,
            y: item.y,
        };
    });
    const offset = getDuplicateOffset(originals);

    originals.forEach(({ itemRef, x, y }) => {
        const item = getItem(itemRef);

        if (!item) return;

        item.x = x + offset.x;
        item.y = y + offset.y;
    });

    setSelection(clonedItems);
}

function moveSelectedItemsBy(deltaX, deltaY) {
    selectedItems.forEach((itemRef) => {
        const item = getItem(itemRef);

        if (!item) return;

        item.x += deltaX;
        item.y += deltaY;
    });
}

function updateSelectedItemsFromInputs() {
    const bounds = getSelectionBounds();

    if (!bounds) return;

    const positionOffset = getSelectionPositionOffset();
    const targetX = clamp(
        Number(selectionXInput.value) || 0,
        Number(selectionXInput.min) || 0,
        Number(selectionXInput.max) || 0
    ) - positionOffset;
    const targetY = clamp(
        Number(selectionYInput.value) || 0,
        Number(selectionYInput.min) || 0,
        Number(selectionYInput.max) || 0
    ) - positionOffset;

    moveSelectedItemsBy(targetX - bounds.x, targetY - bounds.y);
    clampItems();
    syncSelectionControls();
    render();
}

function getCanvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
    };
}

function isPointInsideRect(point, rect) {
    return (
        point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height
    );
}

function rectsIntersect(first, second) {
    return (
        first.x < second.x + second.width &&
        first.x + first.width > second.x &&
        first.y < second.y + second.height &&
        first.y + first.height > second.y
    );
}

function hitTestCollection(point, type, collection) {
    for (let index = collection.length - 1; index >= 0; index -= 1) {
        const itemRef = { type, id: collection[index].id };
        const rect = getItemCanvasRect(itemRef);

        if (isPointInsideRect(point, rect)) {
            return itemRef;
        }
    }

    return null;
}

function hitTestLayeredItem(point) {
    const layerOrder = getLayeredItemRefs();

    for (let index = layerOrder.length - 1; index >= 0; index -= 1) {
        const itemRef = layerOrder[index];
        const rect = getItemCanvasRect(itemRef);

        if (isPointInsideRect(point, rect)) {
            return itemRef;
        }
    }

    return null;
}

function hitTestItem(point) {
    return (
        hitTestCollection(point, "slot", slots) ||
        hitTestLayeredItem(point)
    );
}

function getItemsInMarquee() {
    const marquee = getMarqueeRect();

    if (!marquee || marquee.width < 3 || marquee.height < 3) return [];

    return getAllItemRefs().filter((itemRef) => {
        const item = getItem(itemRef);

        return item && rectsIntersect(getItemCanvasRect(itemRef), marquee);
    });
}

function getAllowedDragDelta(originals, rawDeltaX, rawDeltaY) {
    const guiSize = getGuiInnerSize();
    let minDeltaX = -Infinity;
    let maxDeltaX = Infinity;
    let minDeltaY = -Infinity;
    let maxDeltaY = Infinity;

    originals.forEach(({ itemRef, x, y }) => {
        const size = getItemSize(itemRef);

        minDeltaX = Math.max(minDeltaX, -x);
        maxDeltaX = Math.min(maxDeltaX, Math.max(0, guiSize.width - size.width) - x);
        minDeltaY = Math.max(minDeltaY, -y);
        maxDeltaY = Math.min(maxDeltaY, Math.max(0, guiSize.height - size.height) - y);
    });

    return {
        x: clamp(rawDeltaX, minDeltaX, maxDeltaX),
        y: clamp(rawDeltaY, minDeltaY, maxDeltaY),
    };
}

function moveSelectionToCanvasPoint(point) {
    const rawDeltaX = Math.round((point.x - activeDrag.startPoint.x) / SCALE);
    const rawDeltaY = Math.round((point.y - activeDrag.startPoint.y) / SCALE);
    const delta = getAllowedDragDelta(activeDrag.originals, rawDeltaX, rawDeltaY);

    activeDrag.originals.forEach(({ itemRef, x, y }) => {
        const item = getItem(itemRef);

        if (!item) return;

        item.x = x + delta.x;
        item.y = y + delta.y;
    });
}

function beginMoveDrag(itemRef, point, pointerId) {
    if (!isItemSelected(itemRef)) {
        setSelection([itemRef]);
    }

    activeDrag = {
        mode: "move",
        pointerId,
        startPoint: point,
        originals: selectedItems.map((selectedItem) => {
            const item = getItem(selectedItem);

            return {
                itemRef: selectedItem,
                x: item.x,
                y: item.y,
            };
        }),
    };

    canvas.setPointerCapture(pointerId);
}

function beginBoxDrag(point, pointerId) {
    activeDrag = {
        mode: "box",
        pointerId,
        startPoint: point,
        currentPoint: point,
    };

    setSelection([]);
    canvas.setPointerCapture(pointerId);
}

function isActivePointer(pointerId) {
    return activeDrag && activeDrag.pointerId === pointerId;
}

function finishDrag(pointerId) {
    if (activeDrag?.mode === "box") {
        const itemsInMarquee = getItemsInMarquee();
        activeDrag = null;
        setSelection(itemsInMarquee);
    } else {
        activeDrag = null;
        syncSelectionControls();
        render();
    }

    if (canvas.hasPointerCapture(pointerId)) {
        canvas.releasePointerCapture(pointerId);
    }
}

function fillExport(exportCtx, color, x, y, width, height) {
    exportCtx.fillStyle = color;
    exportCtx.fillRect(x, y, width, height);
}

function drawExportTile(exportCtx, srcX, srcY, destX, destY) {
    exportCtx.drawImage(
        atlas,
        srcX,
        srcY,
        TILE_ATLAS_SIZE,
        TILE_ATLAS_SIZE,
        destX,
        destY,
        TILE_ATLAS_SIZE,
        TILE_ATLAS_SIZE
    );
}

function drawExportHorizontalStrip(exportCtx, x, y, width, colors) {
    colors.forEach(([color, row, rows]) => {
        fillExport(exportCtx, color, x, y + row, width, rows);
    });
}

function drawExportVerticalStrip(exportCtx, x, y, height, colors) {
    colors.forEach(([color, col, cols]) => {
        fillExport(exportCtx, color, x + col, y, cols, height);
    });
}

function drawExportGuiFrame(exportCtx, width, height) {
    const left = 0;
    const top = 0;
    const right = width + TILE_ATLAS_SIZE;
    const bottom = height + TILE_ATLAS_SIZE;

    const innerX = TILE_ATLAS_SIZE;
    const innerY = TILE_ATLAS_SIZE;

    drawExportHorizontalStrip(exportCtx, innerX, top, width, [
        [COLORS.black, 0, 1],
        [COLORS.white, 1, 2],
        [COLORS.gray, 3, 1],
    ]);

    drawExportVerticalStrip(exportCtx, left, innerY, height, [
        [COLORS.black, 0, 1],
        [COLORS.white, 1, 2],
        [COLORS.gray, 3, 1],
    ]);

    drawExportVerticalStrip(exportCtx, right, innerY, height, [
        [COLORS.gray, 0, 1],
        [COLORS.dark, 1, 2],
        [COLORS.black, 3, 1],
    ]);

    drawExportHorizontalStrip(exportCtx, innerX, bottom, width, [
        [COLORS.gray, 0, 1],
        [COLORS.dark, 1, 2],
        [COLORS.black, 3, 1],
    ]);

    drawExportTile(exportCtx, 0, 0, left, top);
    drawExportTile(exportCtx, 0, 12, right, top);
    drawExportTile(exportCtx, 0, 8, right, bottom);
    drawExportTile(exportCtx, 0, 4, left, bottom);

    fillExport(exportCtx, COLORS.gray, innerX, innerY, width, height);
}

function drawExportItems(exportCtx, width, height) {
    exportCtx.save();
    exportCtx.beginPath();
    exportCtx.rect(TILE_ATLAS_SIZE, TILE_ATLAS_SIZE, width, height);
    exportCtx.clip();

    getLayeredItemRefs().forEach((itemRef) => {
        const item = getItem(itemRef);

        if (!item) return;

        if (itemRef.type === "image") {
            exportCtx.drawImage(
                item.element,
                TILE_ATLAS_SIZE + item.x,
                TILE_ATLAS_SIZE + item.y,
                item.width,
                item.height
            );
        } else {
            const textCanvas = createPixelTextCanvas(item);

            exportCtx.save();
            exportCtx.imageSmoothingEnabled = false;
            exportCtx.drawImage(
                textCanvas,
                TILE_ATLAS_SIZE + item.x,
                TILE_ATLAS_SIZE + item.y
            );
            exportCtx.restore();
        }
    });

    slots.forEach((slot) => {
        if (slot.visible === false) return;

        exportCtx.drawImage(
            atlas,
            SLOT_ATLAS_X,
            SLOT_ATLAS_Y,
            SLOT_ATLAS_SIZE,
            SLOT_ATLAS_SIZE,
            TILE_ATLAS_SIZE + slot.x,
            TILE_ATLAS_SIZE + slot.y,
            SLOT_ATLAS_SIZE,
            SLOT_ATLAS_SIZE
        );

        drawSlotIconToContext(
            exportCtx,
            slot,
            TILE_ATLAS_SIZE + slot.x,
            TILE_ATLAS_SIZE + slot.y
        );
    });

    exportCtx.restore();
}

function downloadPng() {
    if (!atlasLoaded) return;

    const { width, height } = getGuiSize();
    const innerSize = getGuiInnerSize();
    const exportSize = getOriginalExportSize();
    const exportCanvas = document.createElement("canvas");
    const exportCtx = exportCanvas.getContext("2d");

    exportCanvas.width = exportSize.width;
    exportCanvas.height = exportSize.height;
    exportCtx.imageSmoothingEnabled = false;

    drawExportGuiFrame(exportCtx, innerSize.width, innerSize.height);
    drawExportItems(exportCtx, innerSize.width, innerSize.height);

    const link = document.createElement("a");
    link.download = `minecraft-gui-${width}x${height}.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
}

function downloadTextFile(filename, contents, mimeType) {
    const blob = new Blob([contents], { type: mimeType });
    const link = document.createElement("a");

    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
}

function getProjectData() {
    const { width, height } = getGuiSize();

    return {
        version: 1,
        width,
        height,
        textFont: getProjectTextFontData(),
        slots: slots.map((slot) => ({
            x: slot.x,
            y: slot.y,
            visible: slot.visible !== false,
            ...(slot.icon
                ? { icon: {
                    name: slot.icon.name || "slot-icon",
                    src: slot.icon.src,
                    width: getSlotIconSize(slot.icon).width,
                    height: getSlotIconSize(slot.icon).height,
                } }
                : {}),
        })),
        images: images.map((imageItem) => ({
            name: imageItem.name || "image",
            src: imageItem.src,
            x: imageItem.x,
            y: imageItem.y,
            width: imageItem.width,
            height: imageItem.height,
            layer: imageItem.layer || 0,
        })),
        texts: texts.map((textItem) => ({
            text: textItem.text,
            x: textItem.x,
            y: textItem.y,
            fontSize: textItem.fontSize,
            color: textItem.color,
            layer: textItem.layer || 0,
        })),
    };
}

function getLayoutData() {
    const { width, height } = getGuiSize();

    return {
        version: 1,
        type: "minecraft_gui_layout",
        width,
        height,
        font: getActiveTextFontName(),
        slots: slots.map((slot) => ({
            x: slot.x + SLOT_POSITION_OFFSET,
            y: slot.y + SLOT_POSITION_OFFSET,
            visible: slot.visible !== false,
            ...(slot.icon ? { icon: slot.icon.name || "slot-icon" } : {}),
        })),
        images: images.map((imageItem) => ({
            name: imageItem.name || "image",
            x: imageItem.x,
            y: imageItem.y,
            width: imageItem.width,
            height: imageItem.height,
            layer: imageItem.layer || 0,
            bakedIntoTexture: true,
        })),
        texts: texts.map((textItem) => ({
            text: textItem.text,
            x: textItem.x,
            y: textItem.y,
            fontSize: textItem.fontSize,
            color: textItem.color,
            font: getActiveTextFontName(),
            layer: textItem.layer || 0,
            bakedIntoTexture: true,
        })),
    };
}

function saveProject() {
    const { width, height } = getGuiSize();
    const project = JSON.stringify(getProjectData(), null, 2);

    downloadTextFile(
        `minecraft-gui-${width}x${height}.mcgui.json`,
        project,
        "application/json"
    );
}

function exportLayoutJson() {
    const { width, height } = getGuiSize();
    const layout = JSON.stringify(getLayoutData(), null, 2);

    downloadTextFile(
        `minecraft-gui-${width}x${height}.layout.json`,
        layout,
        "application/json"
    );
}

function loadImageFromSource(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", () => {
            reject(new Error("Image could not be decoded."));
        });
        image.src = src;
    });
}

function getNumber(value, fallback) {
    const number = Number(value);

    return Number.isFinite(number) ? number : fallback;
}

async function buildSlotIcon(projectIcon) {
    if (!projectIcon?.src) return null;

    const image = await loadImageFromSource(projectIcon.src);

    return {
        name: projectIcon.name || "slot-icon",
        src: projectIcon.src,
        element: image,
        width: clamp(
            Math.round(getNumber(projectIcon.width, image.naturalWidth || SLOT_ICON_SIZE)),
            1,
            SLOT_ICON_SIZE
        ),
        height: clamp(
            Math.round(getNumber(projectIcon.height, image.naturalHeight || SLOT_ICON_SIZE)),
            1,
            SLOT_ICON_SIZE
        ),
    };
}

function createSlotIconFromImageItem(imageItem) {
    return {
        name: imageItem.name || "slot-icon",
        src: imageItem.src,
        element: imageItem.element,
        width: Math.min(imageItem.width || SLOT_ICON_SIZE, SLOT_ICON_SIZE),
        height: Math.min(imageItem.height || SLOT_ICON_SIZE, SLOT_ICON_SIZE),
    };
}

function isLikelySlotIconImage(imageItem) {
    return (
        /slot[_-](head|helmet|chest|chestplate|legs|leggings|boots|shield|icon)/i.test(imageItem.name || "") &&
        imageItem.width <= SLOT_ICON_SIZE &&
        imageItem.height <= SLOT_ICON_SIZE
    );
}

function findSlotForIconImage(imageItem) {
    return slots.find((slot) => {
        if (slot.icon) return false;

        const iconLeft = slot.x + SLOT_ICON_OFFSET;
        const iconTop = slot.y + SLOT_ICON_OFFSET;
        const iconRight = iconLeft + SLOT_ICON_SIZE;
        const iconBottom = iconTop + SLOT_ICON_SIZE;

        return (
            imageItem.x >= iconLeft &&
            imageItem.y >= iconTop &&
            imageItem.x + imageItem.width <= iconRight &&
            imageItem.y + imageItem.height <= iconBottom
        );
    }) || null;
}

function migrateSlotIconImages(loadedImages) {
    const regularImages = [];

    loadedImages.forEach((imageItem) => {
        const matchingSlot = isLikelySlotIconImage(imageItem)
            ? findSlotForIconImage(imageItem)
            : null;

        if (matchingSlot) {
            matchingSlot.icon = createSlotIconFromImageItem(imageItem);
        } else {
            regularImages.push(imageItem);
        }
    });

    return regularImages;
}

async function buildImageItems(projectImages) {
    const loadedImages = [];

    for (const projectImage of projectImages) {
        if (!projectImage?.src) continue;

        let image;

        try {
            image = await loadImageFromSource(projectImage.src);
        } catch (error) {
            throw new Error(`Image "${projectImage.name || "image"}" could not be loaded.`);
        }

        const imageItem = {
            id: nextImageId,
            element: image,
            name: projectImage.name || "image",
            src: projectImage.src,
            x: getNumber(projectImage.x, 0),
            y: getNumber(projectImage.y, 0),
            width: Math.max(1, getNumber(projectImage.width, image.naturalWidth)),
            height: Math.max(1, getNumber(projectImage.height, image.naturalHeight)),
            layer: getNumber(projectImage.layer, getNextLayer()),
        };

        nextImageId += 1;
        loadedImages.push(imageItem);
    }

    return loadedImages;
}

function buildTextItems(projectTexts) {
    return projectTexts.map((projectText) => {
        const sourceText = projectText || {};
        const textItem = {
            id: nextTextId,
            text: String(sourceText.text || "Text"),
            x: getNumber(sourceText.x, 0),
            y: getNumber(sourceText.y, 0),
            fontSize: clamp(
                Math.round(getNumber(sourceText.fontSize, TEXT_DEFAULT_SIZE)),
                TEXT_MIN_SIZE,
                TEXT_MAX_SIZE
            ),
            color: sourceText.color || TEXT_DEFAULT_COLOR,
            layer: getNumber(sourceText.layer, getNextLayer()),
        };

        nextTextId += 1;

        return textItem;
    });
}

function getFallbackTemplate(template) {
    return BUILT_IN_TEMPLATES.find((fallback) => fallback.id === template.id);
}

async function loadTemplateManifest() {
    if (window.location.protocol === "file:") {
        return BUILT_IN_TEMPLATES;
    }

    const response = await fetch("templates/manifest.json");

    if (!response.ok) {
        throw new Error(`Template manifest request failed: ${response.status}`);
    }

    const manifestTemplates = await response.json();

    if (!Array.isArray(manifestTemplates)) {
        throw new Error("Template manifest must be an array.");
    }

    return manifestTemplates.map((template) => ({
        ...template,
        data: template.data || getFallbackTemplate(template)?.data,
    }));
}

async function loadProjectData(project) {
    const width = clamp(
        getNumber(project.width, MIN_GUI_SIZE),
        MIN_GUI_SIZE,
        MAX_GUI_SIZE
    );
    const height = clamp(
        getNumber(project.height, MIN_GUI_SIZE),
        MIN_GUI_SIZE,
        MAX_GUI_SIZE
    );
    const projectSlots = Array.isArray(project.slots) ? project.slots : [];
    const projectImages = Array.isArray(project.images) ? project.images : [];
    const projectTexts = Array.isArray(project.texts) ? project.texts : [];

    widthInput.value = width;
    heightInput.value = height;

    slots.length = 0;
    images.length = 0;
    texts.length = 0;
    selectedItems.length = 0;
    activeDrag = null;
    nextSlotId = 1;
    nextImageId = 1;
    nextTextId = 1;
    nextLayer = 1;

    for (const projectSlot of projectSlots) {
        let slotIcon = null;

        try {
            slotIcon = await buildSlotIcon(projectSlot.icon);
        } catch (error) {
            throw new Error(`Slot icon "${projectSlot.icon?.name || "slot-icon"}" could not be loaded.`);
        }

        slots.push({
            id: nextSlotId,
            x: getNumber(projectSlot.x, 0),
            y: getNumber(projectSlot.y, 0),
            visible: projectSlot.visible !== false,
            icon: slotIcon,
        });
        nextSlotId += 1;
    }

    await loadProjectTextFont(project);
    images.push(...migrateSlotIconImages(await buildImageItems(projectImages)));
    texts.push(...buildTextItems(projectTexts));
    normalizeLayers();
    clampItems();
    syncSelectionControls();
    render();
}

async function initializeTemplateSelect() {
    templateSelect.replaceChildren();
    loadTemplateButton.disabled = true;

    try {
        availableTemplates = await loadTemplateManifest();
    } catch (error) {
        console.error(error);
        availableTemplates = BUILT_IN_TEMPLATES;
    }

    availableTemplates.forEach((template) => {
        const option = document.createElement("option");

        option.value = template.id;
        option.textContent = template.name;
        templateSelect.appendChild(option);
    });

    loadTemplateButton.disabled = availableTemplates.length === 0;
}

function getSelectedTemplate() {
    return availableTemplates.find((template) => template.id === templateSelect.value);
}

async function fetchTemplateData(template) {
    if (template.path && window.location.protocol !== "file:") {
        const response = await fetch(template.path);

        if (!response.ok) {
            throw new Error(`Template request failed: ${response.status}`);
        }

        return response.json();
    }

    if (template.data) {
        return JSON.parse(JSON.stringify(template.data));
    }

    throw new Error("This template needs to be loaded from localhost.");
}

async function loadSelectedTemplate() {
    const template = getSelectedTemplate();

    if (!template) return;

    try {
        await loadProjectData(await fetchTemplateData(template));
    } catch (error) {
        console.error(error);

        if (!template.data) {
            throw error;
        }

        await loadProjectData(JSON.parse(JSON.stringify(template.data)));
    }
}

function loadProjectFile(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", async () => {
        try {
            await loadProjectData(JSON.parse(reader.result));
        } catch (error) {
            window.alert("This project file could not be loaded.");
        }
    });

    reader.readAsText(file);
}

function isEditableShortcutTarget(target) {
    if (!target) return false;

    const tagName = target.tagName;

    return (
        target.isContentEditable ||
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT"
    );
}

function handleKeyboardShortcuts(event) {
    if (!event.ctrlKey || event.altKey || event.metaKey) return;
    if (isEditableShortcutTarget(event.target)) return;

    const key = event.key.toLowerCase();

    if (key === "d") {
        event.preventDefault();
        duplicateSelectedItems();
    }

    if (key === "x") {
        event.preventDefault();
        deleteSelectedItems();
    }
}

function render({ showEditorOverlays = true } = {}) {
    if (!atlasLoaded || !fontLoaded) return;

    clearCanvas();

    const { width, height } = getInputSize();

    drawGuiFrame(
        START_X,
        START_Y,
        width,
        height
    );

    drawItems(showEditorOverlays);

    if (showEditorOverlays) {
        drawMarquee();
    }
}

widthInput.addEventListener("input", () => {
    clampItems();
    syncSelectionControls();
    render();
});

heightInput.addEventListener("input", () => {
    clampItems();
    syncSelectionControls();
    render();
});

initializeTemplateSelect().catch((error) => {
    console.error(error);
});

addSlotButton.addEventListener("click", addSlot);
duplicateSelectionButton.addEventListener("click", duplicateSelectedItems);
downloadButton.addEventListener("click", downloadPng);
exportLayoutButton.addEventListener("click", exportLayoutJson);
saveProjectButton.addEventListener("click", saveProject);
loadProjectButton.addEventListener("click", () => {
    projectInput.click();
});
loadTemplateButton.addEventListener("click", () => {
    loadSelectedTemplate().catch((error) => {
        console.error(error);
        window.alert(error.message || "This template could not be loaded.");
    });
});
imageInput.addEventListener("change", () => {
    addCustomImage(imageInput.files[0]);
    imageInput.value = "";
});
addTextButton.addEventListener("click", addText);
textValueInput.addEventListener("input", updateSelectedTextFromInputs);
textSizeInput.addEventListener("input", updateSelectedTextFromInputs);
textColorInput.addEventListener("input", updateSelectedTextFromInputs);
fontInput.addEventListener("change", () => {
    importCustomFont(fontInput.files[0])
        .catch((error) => {
            console.error(error);
            window.alert(error.message || "This font could not be imported.");
        })
        .finally(() => {
            fontInput.value = "";
        });
});
slotVisibleInput.addEventListener("change", updateSelectedSlotFromInputs);
slotIconInput.addEventListener("change", () => {
    importSelectedSlotIcon(slotIconInput.files[0])
        .catch((error) => {
            console.error(error);
            window.alert(error.message || "This slot icon could not be imported.");
        })
        .finally(() => {
            slotIconInput.value = "";
        });
});
clearSlotIconButton.addEventListener("click", clearSelectedSlotIcon);
projectInput.addEventListener("change", () => {
    loadProjectFile(projectInput.files[0]);
    projectInput.value = "";
});
deleteSelectionButton.addEventListener("click", deleteSelectedItems);
sendBackwardButton.addEventListener("click", () => {
    moveSelectedLayeredItems(-1);
});
bringForwardButton.addEventListener("click", () => {
    moveSelectedLayeredItems(1);
});
selectionXInput.addEventListener("input", updateSelectedItemsFromInputs);
selectionYInput.addEventListener("input", updateSelectedItemsFromInputs);
document.addEventListener("keydown", handleKeyboardShortcuts);
zoomOutButton.addEventListener("click", () => {
    zoomEditor(1 / ZOOM_STEP);
});
zoomInButton.addEventListener("click", () => {
    zoomEditor(ZOOM_STEP);
});
zoomFitButton.addEventListener("click", fitEditorZoom);
canvasWrap.addEventListener("wheel", handleZoomWheel, { passive: false });
window.addEventListener("resize", () => {
    if (isFitZoom) {
        fitEditorZoom();
    }
});

canvas.addEventListener("pointerdown", (event) => {
    const point = getCanvasPoint(event);
    const itemRef = hitTestItem(point);

    if (itemRef) {
        beginMoveDrag(itemRef, point, event.pointerId);
    } else {
        beginBoxDrag(point, event.pointerId);
    }
});

canvas.addEventListener("pointermove", (event) => {
    if (!isActivePointer(event.pointerId)) return;

    if (activeDrag.mode === "move") {
        moveSelectionToCanvasPoint(getCanvasPoint(event));
        syncSelectionControls();
    } else {
        activeDrag.currentPoint = getCanvasPoint(event);
    }

    render();
});

canvas.addEventListener("pointerup", (event) => {
    if (!isActivePointer(event.pointerId)) return;

    finishDrag(event.pointerId);
});

canvas.addEventListener("pointercancel", (event) => {
    if (!isActivePointer(event.pointerId)) return;

    activeDrag = null;

    if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
    }

    render();
});

atlas.onload = () => {
    atlasLoaded = true;
    syncSelectionControls();
    fitEditorZoom();
    render();
};
