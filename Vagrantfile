# -*- mode: ruby -*-
# vi: set ft=ruby :

NODE_VERSION = 10
HUGO_VERSION = '0.47.1'

Vagrant.configure(2) do |config|
  config.vm.box = 'ubuntu/xenial64'
  config.vm.provider 'virtualbox' do |v|
    v.name = File.basename(File.dirname(__FILE__))
    v.memory = 512
    v.cpus = 1
  end
  config.vm.network :forwarded_port, guest: 9080, host: 9080

  config.vm.provision :shell, inline: <<-SHELL
    sudo apt-get update
    sudo apt-get autoremove -y
    sudo apt-get install -y \
      git-core \
      golang

    curl -s https://raw.githubusercontent.com/nodesource/distributions/master/deb/setup_#{NODE_VERSION}.x | sudo -E bash -
    sudo apt-get install -y nodejs

    cd /tmp
    curl -sLO https://github.com/gohugoio/hugo/releases/download/v#{HUGO_VERSION}/hugo_extended_#{HUGO_VERSION}_Linux-64bit.deb
    sudo dpkg -i hugo_extended_#{HUGO_VERSION}_Linux-64bit.deb
  SHELL
end
