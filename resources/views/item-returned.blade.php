<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thanks! | {{ config('app.name') }}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .container {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Thanks, {{ $item->contact_name }}!</h1>
        <p><strong>{{ $item->item_name }}</strong> is marked as returned and we've let the owner know.</p>
        <p>You can close this page.</p>
    </div>
</body>

</html>
