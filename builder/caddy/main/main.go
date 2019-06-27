package main

import (
	"github.com/mholt/caddy/caddy/caddymain"

	// Plugins:
	_ "blitznote.com/src/caddy.upload"
	_ "github.com/abiosoft/caddy-git"
	_ "github.com/jung-kurt/caddy-cgi"
	_ "github.com/nicolasazrak/caddy-cache"
)

func main() {
	caddymain.EnableTelemetry = false // Disable telemetry.
	caddymain.Run()
}