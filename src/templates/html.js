export default ({ title = 'CEP Panel', redirectLocationHref }) => {
	return `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
  </head>
  <body>
    <script>
      window.location.href = "${redirectLocationHref}";
    </script>
  </body>
</html>`;
};
