<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>{{ config('app.name') }}</title>
</head>

<body>
    <div class="fixed top-10 right-10">
        <h1 class="text-3xl font-bold text-white"><span id="counter_pemenang">0</span> Pemenang</h1>
    </div>

    <div class="max-w-4xl mt-10 mx-auto">
        <div class="flex flex-col justify-center items-center gap-5">
            <img src="{{ Vite::asset('resources/images/logo_white.png') }}" alt="" class="w-52" />
            <h1 class="text-white text-3xl font-bold">Undian</h1>
            <div class="custom-card flex flex-col justify-between">
                <div class="flex justify-center gap-10">
                    <button id="btn_start" type="button" class="btn-primary text-xl font-bold">START</button>
                    <button id="btn_stop" type="button" class="btn-warning text-xl font-bold">STOP</button>
                    <button id="btn_save" type="button" class="btn-success text-xl font-bold">SAVE</button>
                    <button id="btn_list" type="button" class="btn-dark text-xl font-bold">LIST</button>
                </div>
                <div class="w-full">
                    <h1 id="random_nama" class="text-center font-bold text-4xl tracking-wider">
                        __________________________</h1>
                </div>
            </div>

            <div id="v_list_pemenang" class="grid grid-cols-2 gap-10 container">
            </div>
        </div>
    </div>

    @include('modal')

    <script></script>
</body>

</html>
