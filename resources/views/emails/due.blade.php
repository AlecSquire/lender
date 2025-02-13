
<html>
<head>
    <title>Lender automated email. Your item is due for return</title>
</head>
<body>
    <h1>Hello, {{ $item->contact_name }}!</h1>
    <p>This is an email to let you know that item: {{ $item->item_name }} is due to be returned before {{ $item->return_date }}.</p>

    <p>If you have any questions, feel free to contact us.</p>

    <p>Best Regards,</p>
    <p>{{ config('app.name') }}</p>
</body>
</html>
