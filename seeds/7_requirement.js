/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    await knex('requirement').insert([
        {
            os: "Windows 10 (64 bit)",
            processor: "AMD Ryzen 5 3600 ／ Intel Core i7 8700",
            memory: "16 GB RAM",
            graphic: "AMD Radeon RX 5700 ／ NVIDIA GeForce",
            directx: "Version 12",
            storage: "60 GB available space",
            gameId: 1
        },
        {
            os: "Windows® 7/Vista/XP",
            processor: "Intel® Core™ 2 Duo E6600 or AMD Phenom™ X3 8750 processor or better",
            memory: "2 GB RAM",
            graphic: "Video card must be 256 MB or more and should be a DirectX 9-compatible with support for Pixel Shader 3.0",
            directx: "Version 9.0c",
            storage: "15 GB available space",
            gameId: 2
        },
        {
            os: "Windows 7 / Vista / XP",
            processor: "3.0 GHz P4, Dual Core 2.0 (or higher) or AMD64X2 (or higher)",
            memory: "2 GB RAM",
            graphic: "Video card must be 128 MB or more and with support for Pixel Shader 2.0b (ATI Radeon X800 or higher / NVIDIA GeForce 7600 or higher / Intel HD Graphics 2000 or higher).",
            directx: "Version 9.0c",
            storage: "8 GB available space",
            gameId: 3
        },
        {
            os: "Windows 10 64-bit Operating System",
            processor: "Intel Core i3-4170 or AMD FX-8300 or higher",
            memory: "8 GB RAM",
            graphic: "DX11 Compatible GeForce 760 or AMD HD 8800 or higher with 4GB of RAM",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 4
        },
        {
            os: "Windows 10 64Bit",
            processor: "Intel Core i5-10600 / AMD Ryzen 5 3600",
            memory: "8 GB RAM",
            graphic: "NVIDIA RTX 2060 / AMD Radeon RX 5700",
            directx: "Version 12",
            storage: "18 GB available space",
            gameId: 5
        },
        {
            os: "Win 2000, XP, Vista, 7, 8, 10",
            processor: "1 GHZ",
            memory: "256 MB RAM",
            graphic: "64 MB 3D video card with DirectX OR OpenGL support",
            directx: "Version 9.0",
            storage: "50 MB available space",
            gameId: 6
        },
        {
            os: "Windows 10",
            processor: "Core i5-7500 / Ryzen 5 1600",
            memory: "12 GB RAM",
            graphic: "GTX 1060 / RX 580 - 6GB VRAM",
            directx: "Version 12",
            storage: "40 GB available space",
            gameId: 7
        },
        {
            os: "Windows 7 (SP1) 64bit",
            processor: "Intel Core i3-3225",
            memory: "4 GB RAM",
            graphic: "Nvidia GTX 650 Ti",
            directx: "Version 12",
            storage: "8 GB available space",
            gameId: 8
        },
        {
            os: "Windows 10/11",
            processor: "INTEL CORE I7-8700K or AMD RYZEN 5 3600X",
            memory: "16 GB RAM",
            graphic: "NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA 56 8 GB",
            directx: "Version 12",
            storage: "60 GB available space",
            gameId: 9
        },
        {
            os: "Windows® 10",
            processor: "AMD / Intel CPU running at 3.6 GHz or higher: AMD Ryzen 5 3600X or Intel i5-8600K or newer",
            memory: "16 GB RAM",
            graphic: "NVIDIA® GeForce RTX™ 2060 6GB or AMD RX Vega 56 8GB or newer",
            directx: "Version 12",
            storage: "60 GB available space",
            gameId: 10
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 11
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 12
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 13
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 14
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 15
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 16
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 17
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 18
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 19
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 20
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 21
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 22
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 23
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 24
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 25
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 26
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 27
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 28
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 29
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 30
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 31
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 32
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 33
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 34
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 35
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 36
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 37
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 38
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 39
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 40
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 41
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 42
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 43
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 44
        },
        {
            os: "64-bit Windows 7, Windows 8.1, Windows 10",
            processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
            memory: "16 GB RAM",
            graphic: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
            directx: "Version 11",
            storage: "50 GB available space",
            gameId: 45
        }
    ]);
};
