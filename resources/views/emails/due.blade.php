<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Item Return: The Countdown Begins</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            color: #2c3e50;
            border-bottom: 2px solid #e74c3c;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .item-details {
            background-color: #fff3cd;
            border-left: 4px solid #e74c3c;
            padding: 15px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            color: #7f8c8d;
            font-size: 0.9em;
        }
        .cta-button {
            display: inline-block;
            background-color: #e74c3c;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="header">Tick Tock: Return Timer Activated</h1>

        <p>Hey there, {{ $item->contact_name }}!</p>

        <div class="item-details">
            <strong>Item in Question:</strong>
            <p>{{ $item->item_name }}</p>

            @if($item->item_description)
                <p><em>Aka:</em> {{ $item->item_description }}</p>
            @endif

            <p><strong>Return Deadline:</strong> {{ $item->return_date }} (No, seriously. We mean it.)</p>
        </div>

        <p>Surprise! Remember that item you borrowed? Shocking, I know, but we actually want it back. Crazy concept, right? Our records show it's due for return, and we're not just sending this email for our health.</p>

        <p>Let's break this down:</p>
        <ul>
            <li>You have an item</li>
            <li>We want the item back</li>
            <li>The clock is ticking</li>
        </ul>

        <p>Got questions? Shocking plot twists? Feel free to contact our support team. We're basically waiting by the phone with bated breath.</p>

        <div class="footer">
            <p>© {{ date('Y') }} {{ config('app.name') }} - Masters of the Gentle Reminder</p>
        </div>
    </div>
</body>
</html>
