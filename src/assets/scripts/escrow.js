function onPopCertMar(key){
    window.open('','self','height=700, width=650, status=yes, toolbar=no, menubar=no, location=no');
    document.CERTMARK_FORM.certMarkURLKey.value = key;
    document.CERTMARK_FORM.action='https://escrow.nonghyup.com/?certMarkURLKey=' + key;
    document.CERTMARK_FORM.target='self';
    document.CERTMARK_FORM.submit();
}
