{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };
  outputs = { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in {
      packages.${system}.default = pkgs.stdenvNoCC.mkDerivation {
        name = "snake";
        src = ./.;
        nativeBuildInputs = [ pkgs.typescript ];
        buildPhase = ''
          tsc --build tsconfig.json
        '';
        installPhase = ''
          mkdir -p $out/public/
          cp -r public/* $out/public/
        '';
      };
    };
}
